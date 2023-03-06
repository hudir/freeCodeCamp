# Exercise 5: (Advanced) Change the socket program so that it only shows data after the headers and a blank line have been received. Remember that recv is receiving characters (newlines and all), not lines.
import socket
import re

mySock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# url = input('Enter url - ')
url = 'http://data.pr4e.org/romeo.txt'


try:
    host = re.findall('//([\S\.]+)/|//([\S\.^/]+)$',url)[0][0]
    mySock.connect((host, 80))
    cmd = ('GET ' + url + ' HTTP/1.0\r\n\r\n').encode()
    mySock.send(cmd)
    
    headerLastLine = 0
    while True:
        data = mySock.recv(512)
        if (len(data)< 1 ): break
        dataR = (data.decode())

        if not re.search('Content-Type: ', dataR):
            print(dataR)
        else:
            for line in dataR.split('\n'):
                if headerLastLine == 1 and line.strip != '\n':
                    print(line)
                if(re.search('Content-Type: ', line)):
                    headerLastLine = 1
    
    mySock.close()


except:
    print('please enter corecet url')

