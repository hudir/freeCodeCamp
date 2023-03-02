import re

hand = open('exercise/ex09/mbox-short.txt')

# for line in hand:
#     line = line.rstrip()
#     # if line.find('From:') >= 0:
#     if re.search('From:', line):
#         print(line)

# for line in hand:
#     line = line.rstrip()
#     # if line.startswith('From:') :
#     # if re.search('^From:', line):
#     # if re.search('^X.*:', line):
#     if re.search('^X-\S+:', line):
#         # print(line)

x = 'My 2 Favorite numbers are 19 and 42'
y = re.findall('[0-9]+', x)
print(y)

y = re.findall('[AEIOU]+', x)
print(y)

# Greedy Matching it will take the longer match
x = 'From: Using the : character'
# y = re.findall('^F.+:', x) # ['From: Using the :']
y = re.findall('^F.+?:', x) # ['From:']

print(y)

x = 'From stephen.marquard@uct.ac.za Sat Jan  5 09:14:16 2008'
y = re.findall('\S+@\S+', x) # ['stephen.marquard@uct.ac.za']
print(y)

y = re.findall('^From (\S+@\S+)', x) # ['stephen.marquard@uct.ac.za']
print(y)