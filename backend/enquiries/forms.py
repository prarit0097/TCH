import re
from django import forms

TOPICS = ['Plan a visit', 'DIP Diet information', 'Hospital information']


class EnquiryForm(forms.Form):
    request_id = forms.UUIDField()
    name = forms.CharField(min_length=2, max_length=80)
    phone = forms.CharField(max_length=25)
    topic = forms.ChoiceField(choices=[(x, x) for x in TOPICS])
    consent = forms.BooleanField(required=True)
    website = forms.CharField(required=False, max_length=200)

    def clean_phone(self):
        raw = re.sub(r'[\s()-]', '', self.cleaned_data['phone'])
        if raw.startswith('+91'):
            raw = raw[3:]
        if not re.fullmatch(r'[6-9]\d{9}', raw):
            raise forms.ValidationError('Enter a valid 10-digit Indian mobile number.')
        return '+91' + raw

    def clean_name(self):
        value = self.cleaned_data['name'].strip()
        if any(ord(c) < 32 for c in value):
            raise forms.ValidationError('Enter your name without control characters.')
        return value

    def clean_website(self):
        if self.cleaned_data['website']:
            raise forms.ValidationError('Unable to submit this request. Please call reception.')
        return ''
