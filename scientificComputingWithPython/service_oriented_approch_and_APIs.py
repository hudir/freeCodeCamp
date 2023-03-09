import urllib.request, urllib.parse, urllib.error
import json

serviceUrl = 'https://maps.googleapis.com/maps/api/geocode/json?'

address = 'Tai Yuan, china'

while True:
    url = serviceUrl + urllib.parse.urlencode(
        {'address': address}
    )
    print('Retrieving', url)

    uh = urllib.request.urlopen(url)
    data = uh.read().decode()
    print('Retrieved', len(data), 'characters')

    try:
        js = json.loads(data)
    except:
        js = None

    if not js:
        print('Failure to retrieve')
        break

    print(json.dumps(js, indent=4))
    break