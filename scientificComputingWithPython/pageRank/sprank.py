import sqlite3


conn = sqlite3.connect('./pageRank/spider.sqlite')
cur = conn.cursor()

# make a list of all from id without repeat
cur.execute('SELECT DISTINCT from_id FROM Links')
from_ids = list()
for row in cur:
    from_ids.append(row[0])

# print(from_ids) # [1, 2, 4, 3, 13, 12, 10, 9]

# find the ids that reveive page rank
to_ids = list()
links = list()
cur.execute('SELECT DISTINCT from_id, to_id FROM Links')
for row in cur:
    from_id = row[0]
    to_id = row[1]
    if (from_id == to_id) or (from_id not in from_ids) or (to_id not in from_ids): continue
    links.append(row)
    if to_id not in to_ids: to_ids.append(to_id)


# print(to_ids, links) # [2, 3, 1, 4, 9, 10, 12, 13] [(1, 2), (1, 3), (2, 1), (2, 4), (2, 9), (2, 10), (2, 12), (2, 13), (4, 2), (4, 10), (13, 1), (13, 4), (13, 9), (13, 10), (13, 12), (12, 2), (12, 3), (10, 2), (10, 4), (9, 2)]
