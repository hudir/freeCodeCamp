import sqlite3
import string

conn = sqlite3.connect('./gmaneMaliLData/index.sqlite')
cur = conn.cursor()

cur.execute("SELECT id, subject FROM Subjects")
subjects = dict()
for message_row in cur:
    subjects[message_row[0]] = message_row[1]

cur.execute("SELECT subject_id FROM Messages")
counts = dict()
for message_row in cur:
    text = subjects[message_row[0]]
    text = text.translate(str.maketrans('', '', string.punctuation))
    text = text.translate(str.maketrans('', '', "1234567890"))
    text = text.strip().lower()
    words = text.split()
    for word in words:
        if len(word) < 4 : continue
        counts[word] = counts.get(word, 0) + 1

x = sorted(counts, key=counts.get, reverse=True)
# print(x[:100])
highest = counts[x[0]]
lowest = counts[x[len(x[:100])-1]]
# for k in x[:100]:
#     if highest is None or highest < counts[k]:
#         highest = counts[k]
#     if lowest is None or lowest > counts[k]:
#         lowest = counts[k]
print(('Range of counts:', highest, lowest))

# set front size
bigsize = 80
smallsize = 20

fhand = open("./gmaneMaliLData//gword.js", 'w')
fhand.write("gword = [")

for k in x[:100]:
    size = counts[k]
    size = (size - lowest) / float(highest - lowest)
    size = int(size * bigsize + smallsize)
    fhand.write("{text: '" + k + "', size: " + str(size) + "},\n")
fhand.write('];')

print("done")
