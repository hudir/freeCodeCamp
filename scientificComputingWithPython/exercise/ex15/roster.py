import sqlite3
import json
conn = sqlite3.connect('rosterdb.sqlite')
cur = conn.cursor()

fname = input('Enter file name: ')
if fname is None or len(fname) == 0:
    fname = 'exercise/ex15/roster_data.json'

try:
    fhand = open(fname).read()
    fhand = json.loads(fhand)
except:
    print('Can not open the file:', fname)
    exit()

# set up db and columns

cur.executescript('''
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Member;
DROP TABLE IF EXISTS Course;

CREATE TABLE User (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, name TEXT UNIQUE);

CREATE TABLE Course (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, title TEXT UNIQUE);

CREATE TABLE Member (user_id INTEGER, course_id INTEGER, role INTEGER, PRIMARY KEY(user_id, course_id));
''')

for el in fhand:
   name = el[0]
   course = el[1]
   role = el[2]

   cur.execute('SELECT id FROM User WHERE name = ?',(name,))
   user_id = cur.fetchone()
   if user_id is None:
       cur.execute('INSERT INTO User(name) VALUES (?)', (name,))
       cur.execute('SELECT id FROM User WHERE name = ?',(name,))
       user_id = cur.fetchone()


   cur.execute('SELECT id FROM Course WHERE title = ?',(course,))
   course_id = cur.fetchone()
   if course_id is None:
       cur.execute('INSERT INTO Course(title) VALUES (?)', (course,))
       cur.execute('SELECT id FROM Course WHERE title = ?',(course,))
       course_id = cur.fetchone()

   user_id = user_id[0]
   course_id = course_id[0]
   role = int(role)
   
   cur.execute('SELECT role FROM Member WHERE user_id = ? AND course_id = ?',(user_id, course_id))
   role_col = cur.fetchone()
   if role_col is None:
       cur.execute('INSERT INTO Member(user_id, course_id, role) VALUES (?, ?, ?)', (user_id, course_id, role))
   else:
       cur.execute('UPDATE Member SET role = ? WHERE user_id = ? AND course_id = ?', (role , user_id, course_id))

conn.commit()
print(fname, 'is saving to db')
