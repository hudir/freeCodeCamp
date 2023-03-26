import sqlite3
import zlib
import time

howmany = int(input("How many to dump"))

conn = sqlite3.connect('./gmaneMaliLData/index.sqlite')
cur = conn.cursor()

cur.execute("SELECT id, sender FROM Senders")
senders = dict()
for message_row in cur:
    senders[message_row[0]] = message_row[1]

cur.execute("SELECT id, subject FROM Subjects")
subjects = dict()
for message_row in cur:
    subjects[message_row[0]] = message_row[1]

cur.execute("SELECT id, guid, sender_id, subject_id, sent_at FROM Messages")
messages = dict()
for message_row in cur:
    messages[message_row[0]] = (message_row[1], message_row[2], message_row[3], message_row[4])