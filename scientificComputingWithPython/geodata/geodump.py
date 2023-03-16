import sqlite3
import json
import codecs

conn = sqlite3.connect('./geodata/geodata.sqlite')
cur = conn.cursor()

cur.execute('SELECT * FROM Locations')

fhand = codecs.open('./geodata/where.js', 'w','utf-8')
fhand.write("myData = [\n")

count = 0

for row in cur:
    # print(row[0].decode())
    # print(row[1].decode())
    address = row[0].decode()
    try: js = json.loads(str(row[1].decode()))
    except: continue
    
    if not 'status' in js or not js['status'] == 'OK' : continue

    lat = js['results'][0]['geometry']['location']["lat"]
    lng = js['results'][0]['geometry']['location']["lng"]
    if lat == 0 or lng == 0 : continue
    where = js['results'][0]["formatted_address"]
    where = where.replace("'", "")

    output = '   ['+ str(lat) + ',' + str(lng) + ", '" + where + "'],\n"
    fhand.write(output)

fhand.write(']')
