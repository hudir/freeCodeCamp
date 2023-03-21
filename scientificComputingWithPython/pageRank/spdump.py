import sqlite3

conn = sqlite3.connect('./pageRank/spider.sqlite')
cur = conn.cursor()

cur.execute('''SELECT COUNT(from_id) AS inbound, old_rank, new_rank, id, url
        FROM Pages JOIN Links ON Pages.id = Links.to_id
        WHERE html IS NOT NULL
        GROUP BY id ORDER BY inbound DESC''')

count = 0
for row in cur:
    if count < 50 : print(row)
    count = count + 1

print(count, 'rows.')
cur.close()

# (5, 3.125, 2.528571574528148, 2, 'http://www.dr-chuck.com/dr-chuck/resume/index.htm')
# (3, 0.9916666666666665, 1.2193043866601454, 10, 'http://www.dr-chuck.com/dr-chuck/resume/speaking.htm')
# (3, 0.9916666666666665, 1.2193043866601454, 4, 'http://www.dr-chuck.com/dr-chuck/resume/bio.htm')
# (2, 0.2916666666666664, 0.5073275546585265, 13, 'http://www.dr-chuck.com/dr-chuck/resume/')
# (2, 0.4916666666666665, 0.6092597326051418, 12, 'http://www.dr-chuck.com/')
# (2, 1.0, 1.0, 11, 'http://www.dr-chuck.com/dr-chuck/resume/pictures/index.htm')
# (2, 0.4916666666666665, 0.6092597326051418, 9, 'http://www.dr-chuck.com/dr-chuck/resume/leadership.htm')
# (2, 1.1249999999999998, 0.6977128996776045, 3, 'http://www.dr-chuck.com/sakai-book')
# (2, 0.4916666666666665, 0.6092597326051418, 1, 'http://www.dr-chuck.com')
# (1, 1.0, 1.0, 14, 'http://www.dr-chuck.com/dr-chuck/resume/pictures/')
# 10 rows.