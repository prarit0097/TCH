from django.contrib import admin
from .models import Enquiry


@admin.register(Enquiry)
class EnquiryAdmin(admin.ModelAdmin):
    list_display = ['public_reference', 'name', 'phone', 'topic', 'status', 'created_at']
    list_filter = ['status', 'topic', 'created_at']
    search_fields = ['name', 'phone', 'reference']
    readonly_fields = ['request_id', 'reference', 'name', 'phone', 'topic', 'consent', 'fingerprint', 'created_at']
    list_per_page = 30

    def has_add_permission(self, request):
        return False
