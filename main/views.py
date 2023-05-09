from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from .models import User
from django.http import JsonResponse
from django.http import HttpResponse
import json
import base64
import requests
import urllib.parse
from io import BytesIO
import io
from PIL import Image
from .water_layer_getter import water_layers, img_getter

@login_required
def home_view(req):
    return render(req, "home.html")

def water_getter(request, url):
    url = urllib.parse.unquote(url)
    context = {'titles': water_layers.get_layer_names(url)}
    return JsonResponse(context)

def login_view(req):  
    """view for login page."""
    if req.method == "POST":
        email = req.POST.get("email")
        password = req.POST.get("password")
        user = User.get_user(email, password)
        if user:
            login(req, user)
            return redirect("/home")
        else:
            return render(
                req, "login.html", {"error_message": "Invalid credentials. Try again."})
    if req.method == "GET":
        if hasattr(req, "user"):
            if isinstance(req.user, User):
                logout(req) 
        return render(req, "login.html")       

def error_handler(response, exception=None):
    context = {"user": response.user}
    return render(response, "login.html", context)

# view to deal with server errors
def server_error_handler(response):
    context = {"user": response.user}
    return render(response, "login.html", context)