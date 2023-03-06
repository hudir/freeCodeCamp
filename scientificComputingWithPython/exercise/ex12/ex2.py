# Exercise 2: Change your socket program so that it counts the number of characters it has received and stops displaying any text after it has shown 3000 characters. The program should retrieve the entire document and count the total number of characters and display the count of the number of characters at the end of the document.

import socket
import re

mySock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# url = input('Enter url - ')
url = 'http://data.pr4e.org/romeo.txt'

try:
    print(re.findall('//([\S]+?)/',url)[0])
    host = re.findall('//([\S]+?)/',url)[0]
    mySock.connect((host, 80))
    cmd = ('GET ' + url + ' HTTP/1.0\r\n\r\n').encode()
    mySock.send(cmd)

    size = 0

    while True:
        # if(size > 3000): break
        data = mySock.recv(512)
        if (len(data)< 1 ): break
        size = size + len(data)
        print(data.decode())
        # print(111111111111111111111111111)
    
    mySock.close()
    print('Total number of characters are', size)


except:
    print('please enter corecet url')