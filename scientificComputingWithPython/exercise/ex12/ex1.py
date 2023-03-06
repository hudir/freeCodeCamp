# Exercise 1: Change the socket program socket1.py to prompt the user for the URL so it can read any web page. You can use split('/') to break the URL into its component parts so you can extract the host name for the socket connect call. Add error checking using try and except to handle the condition where the user enters an improperly formatted or non-existent URL.

import socket
import re

mySock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

url = input('Enter url - ')
# url = 'http://data.pr4e.org/romeo.txt'

try:
    host = re.findall('//([\S\.]+)/|//([\S\.^/]+)$',url)[0]
    mySock.connect((host, 80))
    cmd = ('GET ' + url + ' HTTP/1.0\r\n\r\n').encode()
    mySock.send(cmd)

    while True:
        data = mySock.recv(512)
        if (len(data)< 1 ): break
        print(data.decode())
    
    mySock.close()


except:
    print('please enter corecet url')

