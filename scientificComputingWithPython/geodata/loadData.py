import urllib.request, urllib.parse, urllib.error
import sqlite3
import json
import time


serviceurl = 'http://py4e-data.dr-chuck.net/geojson?'

conn =sqlite3.connect('./geodata/geodata.sqlite')
cur = conn.cursor()

# set up db
cur.execute('''CREATE TABLE IF NOT EXISTS Locations(address TEXT, geodata TEXT)''')

where = open('./geodata/where.data')

count = 0
for name in where:
    # if count == 2: break;
    # count = count + 1

    address = name.strip()

    # check if the address is already in db
    cur.execute('SELECT geodata FROM Locations WHERE address = ?', (memoryview(address.encode()), ))
    res = cur.fetchone()

    if not res is None: 
        print('address found in db:', address)
        continue



    params = dict()
    params['address'] = address

    url = serviceurl + urllib.parse.urlencode(params)

    data = urllib.request.urlopen(url).read().decode()
    obj = json.loads(data)

    if not 'error' in obj and 'status' in obj and obj['status'] == 'OK': 
        print(obj)
        # insert data to db
        cur.execute('INSERT INTO Locations(address, geodata) VALUES (?, ?)', (memoryview(address.encode()), memoryview(data.encode())))

        conn.commit()


 
