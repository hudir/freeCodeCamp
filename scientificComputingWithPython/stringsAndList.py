abc = 'With three words'
stuff = abc.split()
print(stuff)

line = 'first;second;third'
thing = line.split(';') # delimiter
print(thing)

words = 'From stephen.marquard@uct.ac.za Fri Jan  4 04:07:34 2008'.split()[1].split('@')[1]
print(words)
