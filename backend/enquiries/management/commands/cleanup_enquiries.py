from datetime import timedelta
from django.core.management.base import BaseCommand, CommandError
from django.utils import timezone
from enquiries.models import Enquiry, RateBucket


class Command(BaseCommand):
    help = 'Preview expired reception records. Pass --apply after confirming the hospital retention period.'

    def add_arguments(self, parser):
        parser.add_argument('--days', type=int, required=True)
        parser.add_argument('--apply', action='store_true')

    def handle(self, *args, **options):
        if options['days'] < 1:
            raise CommandError('--days must be positive.')
        records = Enquiry.objects.filter(created_at__lt=timezone.now() - timedelta(days=options['days']))
        buckets = RateBucket.objects.filter(window__lt=timezone.now() - timedelta(days=2))
        self.stdout.write(f"{'Deleting' if options['apply'] else 'Preview'}: {records.count()} enquiries and {buckets.count()} expired rate buckets.")
        if options['apply']:
            records.delete()
            buckets.delete()
