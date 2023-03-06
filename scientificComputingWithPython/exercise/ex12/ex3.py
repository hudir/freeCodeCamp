# Exercise 3: Use urllib to replicate the previous exercise of (1) retrieving the document from a URL, (2) displaying up to 3000 characters, and (3) counting the overall number of characters in the document. Don't worry about the headers for this exercise, simply show the first 3000 characters of the document contents.

import urllib.request

url = 'http://data.pr4e.org/cover3.jpg'
# url = 'http://data.pr4e.org/romeo.txt'
html = urllib.request.urlopen(url)
size = 0

for line in html:
   if size <= 3000: print(line)
   size = size + len(line)

print('Total number of characters are', size)