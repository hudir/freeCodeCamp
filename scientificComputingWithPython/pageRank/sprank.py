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
# get all ranks and save them
prev_ranks = dict()
for node in from_ids:
    cur.execute('SELECT new_rank FROM Pages WHERE id = ?' ,(node, ))
    row = cur.fetchone()
    prev_ranks[node] = row[0]

sval = input('How many iterations: ')
many = 1
if len(sval) > 0 : many = int(sval)

# sanity check
if len(prev_ranks) < 1:
    print('Nothing to page rank.  Check data.')
    quit()

# Do page rank memory to make this fast
for i in range(many):
    next_ranks = dict()
    total = 0.0

    # get the sum of all old ranks and init new_ranks dict
    for (node, old_rank) in list(prev_ranks.items()):
        total = total + old_rank
        next_ranks[node] = 0.0
        # print(total)
    
    # Find the number of outbound Links and sent the page rank down each
    for (node, old_rank) in list(prev_ranks.items()):
        give_ids = list()
        for (from_id, to_id) in links:
            if from_id != node or to_id not in to_ids: continue
            # print(from_id, to_id)
            give_ids.append(to_id)

        if( len(give_ids) < 1) : continue
        amount = old_rank / len(give_ids)
        # print(node, old_rank, amount, give_ids)
        # 1 1.0 0.5 [2, 3]
        # 2 1.0 0.16666666666666666 [1, 4, 9, 10, 12, 13]
        # 4 1.0 0.5 [2, 10]
        # 13 1.0 0.2 [1, 4, 9, 10, 12]
        # 12 1.0 0.5 [2, 3]
        # 10 1.0 0.5 [2, 4]
        # 9 1.0 1.0 [2]
        for id in give_ids:
            next_ranks[id] = next_ranks[id] + amount
        
    # print(next_ranks) {1: 0.3666666666666667, 2: 3.0, 4: 0.8666666666666667, 3: 1.0, 13: 0.16666666666666666, 12: 0.3666666666666667, 10: 0.8666666666666667, 9: 0.3666666666666667}
    # calc new total
    newtot = 0
    for (node, next_rank) in list(next_ranks.items()):
        newtot = newtot + next_rank
    
    evap = (total - newtot) / len(next_ranks)

    # print(evap) # 0.12499999999999978

    for node in next_ranks:
        next_ranks[node] = next_ranks[node] + evap
    # print(next_ranks) # {1: 0.4916666666666665, 2: 3.125, 4: 0.9916666666666665, 3: 1.1249999999999998, 13: 0.2916666666666664, 12: 0.4916666666666665, 10: 0.9916666666666665, 9: 0.4916666666666665}
    # calc the new total
    newtot = 0
    for (node, next_rank) in list(next_ranks.items()):
        newtot = newtot + next_rank

    # calc the per-page average change from old rank to new rank as indication of cpnvergence of the algorithm
    totdiff = 0
    for (node, old_rank) in list(prev_ranks.items()):
        new_rank = next_ranks[node]
        diff = abs(old_rank - new_rank)
        totdiff = totdiff + diff
    
    avediff = totdiff / len(prev_ranks)
    print(i + 1, avediff)
    
    # rotate
    prev_ranks = next_ranks

# put the final ranks back into the database
print(list(next_ranks.items())[:5])
cur.execute('UPDATE Pages SET old_rank = new_rank')
for (id , new_rank) in list(next_ranks.items()):
    cur.execute('UPDATE Pages SET new_rank = ? WHERE id = ?', (new_rank, id))
conn.commit()
cur.close()

    



    