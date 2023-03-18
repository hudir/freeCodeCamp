import urllib.request, urllib.parse, urllib.error
import sqlite3
import bs4


conn = sqlite3.connect('./pageRank/spider.sqlite')
cur = conn.cursor()
# Create Table and set columns V
# ask for url
# check db to see is that domin we can do this
# check if we alread have html data of the url
# if not, visite it get html and parse to find all a tags
# check db, do we already have those Link or not
# if not, add them to to do list
# save the html, update the from-to table

cur.execute('CREATE TABLE IF NOT EXISTS Pages (id INTEGER PRIMARY KEY, url TEXT UNIQUE, html TEXT, error INTEGER, old_rank REAL, new_rank REAL)')
cur.execute('CREATE TABLE IF NOT EXISTS Links (from_id INTEGER, to_id INTEGER)')
cur.execute('CREATE TABLE IF NOT EXISTS Webs (id INTEGER PRIMARY KEY, url TEXT UNIQUE)')

cur.execute('SELECT * FROM Webs')
allWebs = cur.fetchall()
# print(allWebs)
if len(allWebs) < 1:
    starturl = input('Enter web url or enter: ')
    if len(starturl) < 1 : starturl = 'http://www.dr-chuck.com/'
    starturl = starturl.strip()
    if starturl[len(starturl)-1] == '/': starturl = starturl[:-1]
    web = starturl
    if starturl.endswith('/') or starturl.endswith('.html') :
        pos = starturl.rfind('/')
        web = starturl[:pos]
else:
    try:
        obj=dict()
        for row in allWebs:
            obj[row[0]] = row[1]
            print(row[0], row[1])
        web_id = input('Which website do you want to take? enter the id: ')
        web_id = int(web_id)
        while web_id not in obj:
             print(web_id, 'can not be choosen\n', obj)
             web_id = input('please take another one: ')
        web =  obj[web_id]
        starturl = obj[web_id]
             
    except:
         print('wow sth wrong')
         exit()
        
    
if len(web) > 1 :
        cur.execute('INSERT OR IGNORE INTO Webs (url) VALUES (?)', (web,))
        cur.execute('INSERT OR IGNORE INTO Pages (url, html, new_rank) VALUES (?, Null, 1.0)', (starturl, ))
        conn.commit()



