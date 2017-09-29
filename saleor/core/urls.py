from django.conf.urls import url

from . import views


urlpatterns = [
    url(r'^$', views.home, name='home'),
    url(r'^assembly-care/', views.assembly_care, name='assembly-care'),
    url(r'^style-guide/', views.styleguide, name='styleguide'),
]
