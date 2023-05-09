from django.urls import path
from . import views

urlpatterns = [
    path('', views.login_view, name="login"),
    path('login/', views.login_view, name="login"),
    path('home/', views.home_view, name="home"),
    path('get_water_layers/<path:url>/', views.water_getter, name='get_water_layers'),
]