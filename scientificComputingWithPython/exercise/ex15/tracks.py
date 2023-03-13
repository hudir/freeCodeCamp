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

CREATE TABLE Artist(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, name TEXT);
CREATE TABLE Album(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, title TEXT, artist_id INTEGER);
CREATE TABLE Track(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, title TEXT, album_id INTEGER, len INTERGER, rating INTEGER, count INTEGER);
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
    print(obj)
    if not 'Artist' in obj: continue

    # insert values to db
    


    