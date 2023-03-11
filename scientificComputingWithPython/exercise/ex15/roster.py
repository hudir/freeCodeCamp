import sqlite3
conn = sqlite3.connect('rosterdb.sqlite')
cur = conn.cursor()

fname = input('Enter file name: ')
if fname is None or len(fname) == 0:
    fname = 'exercise/ex15/roster_data.json'

try:
    fhand = open(fname)
except:
    print('Can not open the file:', fname)
    exit()

# set up db and columns

cur.execute('''
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Member;
DROP TABLE IF EXISTS Course;

CREATE TABLE User (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, name TEXT UNIQUE)

CREATE TABLE Course (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, title TEXT UNIQUE)

CREATE TABLE Member ()
''')