import uuid
from django.db import models


class Enquiry(models.Model):
    request_id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    reference = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    name = models.CharField(max_length=80)
    phone = models.CharField(max_length=16)
    topic = models.CharField(max_length=40)
    consent = models.BooleanField()
    fingerprint = models.CharField(max_length=64, editable=False)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    status = models.CharField(max_length=12, choices=[('new', 'New'), ('contacted', 'Contacted'), ('closed', 'Closed')], default='new')

    @property
    def public_reference(self):
        return f'TCH-{str(self.reference).upper()}'

    def __str__(self):
        return self.public_reference


class RateBucket(models.Model):
    key = models.CharField(primary_key=True, max_length=64)
    count = models.PositiveIntegerField(default=0)
    window = models.DateTimeField(db_index=True)
