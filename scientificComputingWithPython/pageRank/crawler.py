import urllib.request, urllib.parse, urllib.error
import sqlite3
from bs4 import BeautifulSoup 
import ssl

# Ignore SSL certificate errors
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

conn = sqlite3.connect('./pageRank/spider.sqlite')
cur = conn.cursor()
# Create Table and set columns V
# ask for url V
# check db to see is that domin we can do this V
# while loop
# take a not retrived page
# check if we alread have html data of the url
# if not, visite it get html and parse to find all a tags
# check db, do we already have those Link or not
# if not, add them to to do list
# save the html, update the from-to table
def updatePageError(conn, cur, url) :  
    cur.execute('UPDATE Pages SET error = 1 WHERE url = ?', (url,))
    conn.commit()

cur.execute('CREATE TABLE IF NOT EXISTS Pages (id INTEGER PRIMARY KEY, url TEXT UNIQUE, html TEXT, error INTEGER, old_rank REAL, new_rank REAL)')
cur.execute('CREATE TABLE IF NOT EXISTS Links (from_id INTEGER, to_id INTEGER)')
cur.execute('CREATE TABLE IF NOT EXISTS Webs (id INTEGER PRIMARY KEY, url TEXT UNIQUE)')

cur.execute('SELECT * FROM Webs')
allWebs = cur.fetchall()
obj=dict()
# print(allWebs)
if len(allWebs) < 1:
    starturl = input('Enter web url or enter: ')
    if len(starturl) < 1 : starturl = 'https://www.dr-chuck.com'
    starturl = starturl.strip()
    if starturl[len(starturl)-1] == '/': starturl = starturl[:-1]
    web = starturl
    if starturl.endswith('/') or starturl.endswith('.html') :
        pos = starturl.rfind('/')
        web = starturl[:pos]
    obj['0'] = starturl
else:
    try:   
        for row in allWebs:
            obj[row[0]] = row[1]
            print(row[0], row[1])
        print('Enter new to give new url')
        web_id = input('Which website do you want to take? enter the id: ')
        if web_id == 'new':
             web_id = input('Enter new url: ')
             web =  web_id
             starturl = web_id
        else:
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
        cur.execute('INSERT OR IGNORE INTO Pages (url, html, new_rank, error) VALUES (?, NULL, 1.0, NULL)', (starturl, ))
        conn.commit()

count = 0
while True:
    if count < 1:
          sval = input('How many pages: ')
          if len(sval) < 1: break
          count = int(sval)
    count = count -1

    cur.execute('SELECT id, url FROM Pages WHERE html is NULL AND error is NULL ORDER BY RANDOM() LIMIT 1')
    
    try:
          data = cur.fetchone()
          from_id = data[0]
          url = data[1]
          print(url)
    except:
        #   update error
        updatePageError(conn,cur,url)
        print(url, 'can not retrive')
        count = 0
        continue

    
    cur.execute('DELETE FROM Links WHERE from_id = ? ', (from_id, ))

    # call the url
    try: 
        doc = urllib.request.urlopen(url, context=ctx)
        html = doc.read()
        if doc.getcode() != 200:
            print('Page Error', doc.getcode())
            updatePageError(conn,cur,url)
            continue

               #   update error
        if doc.info().get_content_type() != 'text/html' :
             print('Page type ignore')
             updatePageError(conn,cur,url)
             continue
        
        print('(' + str(len(html)) + ')', end=' ')

        soup = BeautifulSoup(html, "html.parser")
     
             #   update error
    except KeyboardInterrupt:
         print('')
         print('Stop Program by User')
         break
    except:
         print('Unable to retrive or parse page')
         updatePageError(conn,cur,url)
         continue
    
    cur.execute('UPDATE Pages SET html = ? WHERE url =?', (memoryview(html), url))
    conn.commit()
    
    # till here all good 
    tags = soup('a')



    for tag in tags:
         href = tag.get('href', None)
         if href is None: continue
         
         up = urllib.parse.urlparse(href)
         if len(up.scheme) < 1:
              href = urllib.parse.urljoin(url, href)
         ipos = href.find('#')
         if ipos > 1 : href = href[:ipos]
         if len(href) < 1 or href.endswith('.png') or href.endswith('.jpg') or href.endswith('.gif') :
            continue
        #  make sure new link is inside one of our website
         found =False
        
   
         
         for web in obj.values():
              
              if href.startswith(web): 
                   found = True
                   break
         if not found : continue


        #  insert new link to Pages
         cur.execute('INSERT OR IGNORE INTO Pages(url, html, new_rank, error) VALUES (?,NULL,1,NULL)', (href,))
         conn.commit()

         cur.execute('SELECT id FROM Pages WHERE url = ?', ( href ,))
         try:
              newURL = cur.fetchone()
              to_id = newURL[0]
         except:
              print('Could not retrieve id')
              continue
              
        #  insert new link to Links
         cur.execute('INSERT OR IGNORE INTO Links (from_id, to_id) VALUES (?, ?)', (from_id, to_id))

         print('New Link', href)


cur.close()


         







