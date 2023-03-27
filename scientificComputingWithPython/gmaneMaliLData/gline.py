import sqlite3

conn = sqlite3.connect('./gmaneMaliLData/index.sqlite')
cur = conn.cursor()

cur.execute("SELECT id, sender FROM Senders")
senders = dict()
for message_row in cur:
    senders[message_row[0]] = message_row[1]

cur.execute("SELECT id, guid, sender_id, subject_id, sent_at FROM Messages")
messages = dict()
for message_row in cur:
    messages[message_row[0]] = (message_row[1], message_row[2], message_row[3], message_row[4])

print("Loaded allsenders",len(messages),"senders=",len(senders))

sendorgs = dict()
for (message_id, message) in list(messages.items()):
    sender = message[1]
    pieces = senders[sender].split("@")
    if len(pieces) != 2 : continue
    dns = pieces[1]
    sendorgs[dns] = sendorgs.get(dns, 0) + 1

orgs = sorted(sendorgs, key=sendorgs.get, reverse=True)
topten = orgs[:10]

print(("Top ten Organizations"))
print(topten)

counts = dict()
months = list()

for (message_id, message) in list(messages.items()):
    sender = message[1]
    pieces = senders[sender].split("@")
    if len(pieces) != 2 : continue
    dns = pieces[1]
    if dns not in topten: continue
    month = message[3][:7]
    # print(month)
    if month not in months: months.append(month)
    key = (month, dns)
    counts[key] = counts.get(key, 0) + 1

months.sort()

fhand = open("./gmaneMaliLData/gline.js", 'w')
fhand.write("gline = [ ['year'")

for org in topten:
    fhand.write(",'" + org + "'")

fhand.write("]")

for month in months:
    fhand.write(",\n['" + month + "'")
    for org in topten:
        key = (month, org)
        val = counts.get(key, 0)
        fhand.write("," + str(val))
    fhand.write("]")

fhand.write("\n];\n")

print("all done")

