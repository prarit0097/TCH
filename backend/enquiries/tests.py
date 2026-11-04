import json
import uuid
from django.test import Client, TestCase, override_settings
from .models import Enquiry


class EnquiryTests(TestCase):
    def payload(self, **changes):
        return {'request_id': str(uuid.uuid4()), 'name': 'Test Visitor', 'phone': '8512040000', 'topic': 'Plan a visit', 'consent': True, 'website': '', **changes}

    def post(self, data, client=None):
        return (client or self.client).post('/api/enquiries/', data=json.dumps(data), content_type='application/json')

    def test_valid_enquiry_is_persisted_with_reference(self):
        response = self.post(self.payload())
        self.assertEqual(response.status_code, 201)
        self.assertTrue(response.json()['reference'].startswith('TCH-'))
        self.assertEqual(Enquiry.objects.count(), 1)
        self.assertEqual(Enquiry.objects.get().phone, '+918512040000')

    def test_validation_rejects_phone_and_missing_consent(self):
        for changes in [{'phone': '123'}, {'consent': False}, {'name': ''}, {'topic': 'unrecognized'}, {'request_id': 'invalid'}, {'phone': '+448512040000'}, {'consent': 'false'}]:
            self.assertEqual(self.post(self.payload(**changes)).status_code, 400)
        self.assertEqual(Enquiry.objects.count(), 0)

    def test_duplicate_returns_same_reference_and_changed_reuse_conflicts(self):
        data = self.payload()
        first = self.post(data)
        second = self.post(data)
        self.assertEqual(second.status_code, 200)
        self.assertEqual(first.json()['reference'], second.json()['reference'])
        self.assertEqual(self.post({**data, 'name': 'Different Person'}).status_code, 409)
        self.assertEqual(Enquiry.objects.count(), 1)

    def test_csrf_required_and_token_flow_works(self):
        client = Client(enforce_csrf_checks=True)
        self.assertEqual(self.post(self.payload(), client).status_code, 403)
        token = client.get('/api/csrf/').json()['token']
        response = client.post('/api/enquiries/', data=json.dumps(self.payload()), content_type='application/json', HTTP_X_CSRFTOKEN=token)
        self.assertEqual(response.status_code, 201)

    @override_settings(ENQUIRY_RATE_LIMIT=2)
    def test_limit_persists_between_clients_and_returns_retry_after(self):
        self.assertEqual(self.post(self.payload()).status_code, 201)
        self.assertEqual(self.post(self.payload(), Client()).status_code, 201)
        response = self.post(self.payload())
        self.assertEqual(response.status_code, 429)
        self.assertIn('Retry-After', response)
        self.assertEqual(Enquiry.objects.count(), 2)

    def test_invalid_json_arrays_size_and_honeypot_do_not_save(self):
        self.assertEqual(self.client.post('/api/enquiries/', data='{', content_type='application/json').status_code, 400)
        self.assertEqual(self.post([]).status_code, 400)
        self.assertEqual(self.post(self.payload(name='x' * 9000)).status_code, 413)
        self.assertEqual(self.post(self.payload(website='spam.test')).status_code, 400)
        self.assertEqual(Enquiry.objects.count(), 0)

    def test_health_and_method_rules(self):
        self.assertEqual(self.client.get('/api/health/').status_code, 200)
        self.assertEqual(self.client.get('/api/enquiries/').status_code, 405)
