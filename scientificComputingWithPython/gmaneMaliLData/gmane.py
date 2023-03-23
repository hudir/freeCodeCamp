import sqlite3
import time
import ssl
import urllib.request, urllib.parse, urllib.error
from urllib.parse import urljoin
from urllib.parse import urlparse
import re
from datetime import datetime, timedelta
import dateutil.parser as parser

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

conn = sqlite3.connect('./gmaneMaliLData/content.sqlite')
cur = conn.cursor()

baseurl = "http://mbox.dr-chuck.net/sakai.devel/"

cur.execute('''CREATE TABLE IF NOT EXISTS Messages (id, INTEGER UNIQUE, email TEXT, sent_at TEXT, subject TEXT, headers TEXT, body TEXT)''')

# get current id of db
start = None
cur.execute('SELECT max(id) FROM Messages')
try:
    row = cur.fetchone()
    if row is None: start = 0
    else: row = row[0]
except: start = 0

if start is None : start = 0

many = 0
count = 0
fail = 0

while True:
    if (many < 1) :
        sval = input("How many messages: ")
        if len(sval) < 1 : break
        many = int(sval)

    start = start + 1
    cur.execute('SELECT id FROM Messages where id = ? ', (start, ))
    try:
        row = cur.fetchone()
        if row is not None: continue
    except: row = None

    many = many - 1
    url = baseurl + str(start) + '/' + str(start + 1)

    text = "None"
    try:
        # open with a timeout of 30 seconds
        document = urllib.request.urlopen(url, None, 30, context=ctx)
        text = document.read().decode()
        if document.getcode() != 200 :
            print("Error code=", document.getcode(), url)
            break
    except KeyboardInterrupt:
        print('')
        print('Program interrupted by user...')
        break
    except Exception as err:
        print("Unable to retrieve or parse page", url)
        print("Error ", err)
        fail = fail + 1
        if fail > 5 : break
        continue

    print(url, len(text))
    count = count + 1

    if not text.startswith("From "):
        print()