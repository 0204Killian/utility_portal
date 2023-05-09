import requests
import xml.etree.ElementTree as ET
import json

def get_layer_names(url):
    wms_url = url

    params = {
    'request': 'GetMap',
    'service': 'WMS',
    'version': '1.1.1',
    'layers': '0',
    'bbox': '-180,-90,180,90',
    'width': '800',
    'height': '600',
    'srs': 'EPSG:4326',
    'format': 'image/png',
    'styles': ''
    }

    response = requests.get(wms_url, params=params)

    root = ET.fromstring(response.content)

    titles = []
    for layer_element in root.findall('.//Layer/Layer'):
        title_element = layer_element.find('Title')
        if title_element is not None:
            titles.append(title_element.text)

    json_data = json.dumps(titles)

    return titles