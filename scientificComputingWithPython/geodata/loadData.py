import urllib.request, urllib.parse, urllib.error
import sqlite3
import json

serviceurl = 'http://py4e-data.dr-chuck.net/geojson?'

conn =sqlite3.connect('./geodata/geodata.sqlite')
cur = conn.cursor()