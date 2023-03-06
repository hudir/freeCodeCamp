# Exercise 4: Change the urllinks.py program to extract and count paragraph (p) tags from the retrieved HTML document and display the count of the paragraphs as the output of your program. Do not display the paragraph text, only count them. Test your program on several small web pages as well as some larger web pages.
import urllib.request
from bs4 import BeautifulSoup

# url = 'http://www.dr-chuck.com/page1.htm'
# url = 'http://www.dr-chuck.com/'
url = 'https://books.trinket.io/pfe/12-network.html'

html = urllib.request.urlopen(url).read()
soup = BeautifulSoup(html, 'html.parser')
size = 0
tags = soup('p')
for tag in tags:
    size = size + len(tag)
    # print(tag)
print('The total <p> tag length is: ', size)
