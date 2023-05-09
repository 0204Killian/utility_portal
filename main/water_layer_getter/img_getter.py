import requests
import base64
import xml.etree.ElementTree as ET
from django.http import HttpResponse
import gzip

def get_imgs(url):
    headers = {"Accept-Encoding": "identity"}
    params = {
        'service': 'WMS',
        'request': 'GetLegendGraphic',
        'version': '1.3.0',
        'layer': 1,
        'style': 'default',
        'format': 'image/png',
        'width': '18',
        'height': '20'
    }
    response = requests.get(url, params=params, headers=headers)

    if response.status_code == 200:
        image_data = response.content
        return HttpResponse(image_data, content_type='image/png')
    else:
        return HttpResponse(status=500)
    