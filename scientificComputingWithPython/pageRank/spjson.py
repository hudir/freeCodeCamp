import sqlite3

conn = sqlite3.connect('./pageRank/spider.sqlite')
cur = conn.cursor()

cur.execute('''SELECT COUNT(from_id) AS inbound, old_rank, new_rank, id, url
        FROM Pages JOIN Links ON Pages.id = Links.to_id
        WHERE html IS NOT NULL AND ERROR IS NULL
        GROUP BY id ORDER BY id,inbound''')

print("Create JSON output on spider.js...")
howmany = int(input("How many nodes? "))

fhand = open('./pageRank/spider.js', 'w')
nodes = list()
maxrank = None
minrank = None

for row in cur:
    nodes.append(row)
    rank = row[2]
    if maxrank is None or maxrank < rank: maxrank = rank
    if minrank is None or minrank > rank: minrank = rank
    if len(nodes) > howmany : break

if maxrank == minrank or maxrank is None or minrank is None:
    print("Error - please check data or run sprank.py to compute page rank")
    quit()

fhand.write('spiderJson = {\n   "nodes": [\n      ')
count = 0
map = dict()
ranks = dict()

for row in nodes:
    if count > 0: fhand.write(',\n      ')
    rank = row[2]
    rank = 19 * (rank - minrank) / (maxrank - minrank)
    fhand.write('{"weight": ' + str(row[0]) + ', "rank": ' + str(rank) + ', "id": ' + str(row[3]) + ', "url": "' + row[4] + '"}')
    map[row[3]] = count
    ranks[row[3]] = rank
    count = count + 1
fhand.write( '],\n   "Links": [    ')

cur.execute('SELECT DISTINCT from_id, to_id FROM Links')
count = 0
for row in cur:
    if row[0] not in map or row[1] not in map: continue
    if count > 0: fhand.write(',\n      ')
    rank = ranks[row[0]]
    srank = 19 * (rank - minrank) / (maxrank - minrank)
    fhand.write('{"source": ' + str(map[row[0]]) + ', "target": ' + str(map[row[1]]) + ', "value": 3}')
    count = count + 1
fhand.write('\n   ]\n}')
fhand.close()
cur.close()

print('done, open force.html in a browser to view the visualization')
