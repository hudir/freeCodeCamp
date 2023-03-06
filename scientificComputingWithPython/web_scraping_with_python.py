import urllib.request, urllib.parse,  urllib.error 
from bs4 import BeautifulSoup
# import ssl

# # Ignore SSL certificate errors
# ctx = ssl.create_default_context()
# ctx.check_hostname = False
# ctx.verify_mode = ssl.CERT_NONE

# url = 'http://www.dr-chuck.com/page1.htm'
# html = urllib.request.urlopen(url).read()
# soup = BeautifulSoup(html, 'html.parser')

# tags = soup('a')
# for tag in tags:
#       # Look at the parts of a tag
#     print('TAG:', tag)
#     print('URL:', tag.get('href', None))
#     print('Contents:', tag.contents[0])
#     print('Attrs:', tag.attrs)


# img = urllib.request.urlopen('http://data.pr4e.org/cover3.jpg').read()
# fhand = open('cover3.jpg', 'wb')
# fhand.write(img)
# fhand.close()

# # Code: http://www.py4e.com/code3/curl1.py
# # Or select Download from this trinket's left-hand menu


import urllib.request, urllib.parse, urllib.error

img = urllib.request.urlopen('http://data.pr4e.org/cover3.jpg')
fhand = open('cover3.jpg', 'wb')
size = 0
while True:
    info = img.read(100000)
    if len(info) < 1: break
    size = size + len(info)
    fhand.write(info)
    print(info)

print(size, 'characters copied.')
fhand.close()

# Code: http://www.py4e.com/code3/curl2.py
# Or select Download from this trinket's left-hand menu