import hashlib
import json
from django.conf import settings
from django.db import connection, transaction
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.utils import timezone
from django.utils.crypto import salted_hmac
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_GET, require_POST
from .forms import EnquiryForm
from .models import Enquiry, RateBucket


def error(message, status=400, fields=None):
    return JsonResponse({'error': message, **({'fields': fields} if fields else {})}, status=status)


def csrf_failure(request, reason=''):
    return error('Your session could not be verified. Refresh this page and try again.', 403)


@require_GET
@ensure_csrf_cookie
def csrf_token(request):
    response = JsonResponse({'token': get_token(request)})
    response['Cache-Control'] = 'no-store'
    return response


@require_GET
def health(request):
    try:
        with connection.cursor() as cursor:
            cursor.execute('SELECT 1')
        return JsonResponse({'status': 'ok'})
    except Exception:
        return JsonResponse({'status': 'unavailable'}, status=503)


@require_POST
def create_enquiry(request):
    if int(request.META.get('CONTENT_LENGTH') or 0) > 8192:
        return error('This request is too large. Please use only the contact fields.', 413)
    if request.content_type != 'application/json':
        return error('Send this request as JSON.', 415)
    try:
        data = json.loads(request.body)
    except (ValueError, UnicodeDecodeError):
        return error('The request could not be read. Refresh and try again.')
    if not isinstance(data, dict):
        return error('The request must contain contact fields.')
    if data.get('consent') is not True:
        return error('Please agree to be contacted about your request.', fields={'consent': ['Consent is required.']})
    form = EnquiryForm(data)
    if not form.is_valid():
        return error('Please check the highlighted details.', fields=form.errors.get_json_data(escape_html=True))
    clean = form.cleaned_data
    content = {k: clean[k] for k in ['name', 'phone', 'topic', 'consent']}
    fingerprint = hashlib.sha256(json.dumps(content, sort_keys=True).encode()).hexdigest()
    existing = Enquiry.objects.filter(request_id=clean['request_id']).first()
    if existing:
        if existing.fingerprint != fingerprint:
            return error('These details changed after submission. Refresh to send a new request.', 409)
        return JsonResponse({'reference': existing.public_reference}, status=200)
    ip = request.META.get('REMOTE_ADDR', '')
    if getattr(settings, 'ENQUIRY_TRUST_PROXY', False):
        ip = request.META.get('HTTP_X_REAL_IP', ip)
    now = timezone.now()
    window = now.replace(minute=0, second=0, microsecond=0)
    key = salted_hmac('enquiry-rate', f'{ip}:{window.isoformat()}').hexdigest()
    with transaction.atomic():
        bucket, _ = RateBucket.objects.get_or_create(key=key, defaults={'window': window})
        bucket = RateBucket.objects.select_for_update().get(key=key)
        if bucket.count >= settings.ENQUIRY_RATE_LIMIT:
            response = error('Too many requests. Please call or WhatsApp reception.', 429)
            response['Retry-After'] = str(3600 - now.minute * 60 - now.second)
            return response
        record, created = Enquiry.objects.get_or_create(request_id=clean['request_id'], defaults={**content, 'fingerprint': fingerprint})
        if record.fingerprint != fingerprint:
            return error('This request identifier has already been used.', 409)
        if created:
            bucket.count += 1
            bucket.save(update_fields=['count'])
    response = JsonResponse({'reference': record.public_reference}, status=201 if created else 200)
    response['Cache-Control'] = 'no-store'
    return response
