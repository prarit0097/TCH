from django.contrib import admin
from django.urls import path
from enquiries import views

urlpatterns = [
    path('staff/', admin.site.urls),
    path('api/csrf/', views.csrf_token),
    path('api/enquiries/', views.create_enquiry),
    path('api/health/', views.health),
]
admin.site.site_header = 'The Circadian Hospital'
admin.site.site_title = 'Hospital reception'
admin.site.index_title = 'Reception enquiries'
