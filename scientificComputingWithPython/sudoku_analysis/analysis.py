import urllib.request, urllib.parse, urllib.error
import sqlite3
import json

url = 'http://localhost:5000/newgame'

connection = urllib.request.urlopen(url)

data = connection.read()

obj = json.loads(data)

print(obj)