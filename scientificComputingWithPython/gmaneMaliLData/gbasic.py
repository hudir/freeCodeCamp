import sqlite3

howmany = int(input("How many to dump "))

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

print("Loaded allsenders",len(messages),"subject=",len(subjects),"senders=",len(senders))

sendcounts = dict()
sendorgs = dict()
for (message_id, message) in list(messages.items()):
    sender = message[1]
    sendcounts[sender] = sendcounts.get(sender, 0) + 1
    # if sender not in senders: print(111111111, sender)
    # print(senders[sender])
    pieces = senders[sender].split("@")
    if len(pieces) != 2 : continue
    dns = pieces[1]
    sendorgs[dns] = sendorgs.get(dns, 0) + 1

print('')
print("Top", howmany, "Email list participants")

x = sorted(sendcounts, key=sendcounts.get, reverse=True)
for k in x[:howmany]:
    print(senders[k], sendcounts[k])
    if sendcounts[k] < 10: break

print('')
print("Top", howmany, "Email list organizations")

y = sorted(sendorgs, key=sendorgs.get, reverse=True)
for k in y[:howmany]:
    print(k, sendorgs[k])
    if sendorgs[k] < 10: break

