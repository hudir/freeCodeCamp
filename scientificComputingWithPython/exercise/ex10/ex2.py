# Exercise 2: This program counts the distribution of the hour of the day for each of the messages. You can pull the hour from the "From" line by finding the time string and then splitting that string into parts using the colon character. Once you have accumulated the counts for each hour, print out the counts, one per line, sorted by hour as shown below.

# Sample Execution:

# python timeofday.py
# Enter a file name: mbox-short.txt
# From stephen.marquard@uct.ac.za Sat Jan  5 09:14:16 2008
# 04 3
# 06 1
# 07 1
# 09 2
# 10 3
# 11 6
# 14 1
# 15 2
# 16 4
# 17 2
# 18 1
# 19 1

input = open('exercise/ex09/mbox-short.txt')

obj = dict()

for line in input:
    if line.startswith("From "):
        h = line.split()[5].split(':')[0]
        obj[h] = obj.get(h, 0) + 1

for k,v in sorted(obj.items()):
    print(k,v)
