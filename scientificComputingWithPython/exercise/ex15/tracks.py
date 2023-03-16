import xml.etree.ElementTree as ET
import sqlite3

conn = sqlite3.connect('trackdb.sqlite')
cur = conn.cursor()

fname = input('Please enter xml file name: ')

if len(fname) == 0: fname = 'exercise/ex15/Library.xml'

try:
    fhand = open(fname)
except:
    print('can not find the file', fname)
    exit()

# set up tables
cur.executescript('''
DROP TABLE IF EXISTS Album;
DROP TABLE IF EXISTS Artist;
DROP TABLE IF EXISTS Track;

CREATE TABLE Artist(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, name TEXT UNIQUE);
CREATE TABLE Album(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, title TEXT UNIQUE, artist_id INTEGER);
CREATE TABLE Track(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, title TEXT UNIQUE, album_id INTEGER, len INTERGER, rating INTEGER, count INTEGER);
''')

# read xml and  value
stuff = ET.fromstringlist(fhand)
all = stuff.findall('dict/dict/dict')

for entry in all:
    # convert item to a dict
    lastkey = None
    obj = dict()
    for ele in entry:
        if ele.tag == 'key':
            lastkey = ele.text
        else:
            obj[lastkey] = ele.text
    
    if not 'Track ID' in obj or not 'Album' in obj or not 'Rating' in obj: continue
    print(obj)

    # insert values to db
    cur.execute('INSERT OR IGNORE INTO Artist(name) VALUES (?)', (obj["Artist"], ))
    cur.execute('SELECT id FROM Artist WHERE name = ?', (obj["Artist"] , ))
    artist_id = cur.fetchone()[0]

    cur.execute('INSERT OR IGNORE INTO Album(title, artist_id ) VALUES (?, ?)', (obj['Album'], artist_id))
    cur.execute('SELECT id FROM Album WHERE title = ?', (obj['Album'] ,))
    album_id = cur.fetchone()[0]

    cur.execute('INSERT OR REPLACE INTO Track(title, album_id, len, rating, count) VALUES (?, ?, ?, ?, ?)', (obj['Name'], album_id, obj['Total Time'], obj['Rating'], obj['Play Count']))
    
    conn.commit()

print('all done')




    