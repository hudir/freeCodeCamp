abc = 'With three words'
stuff = abc.split()
print(stuff)

line = 'first;second;third'
thing = line.split(';') # delimiter
print(thing)

words = 'From stephen.marquard@uct.ac.za Fri Jan  4 04:07:34 2008'.split()[1].split('@')[1]
print(words)

# To check whether two variables refer to the same object, you can use the is operator.To check whether two variables refer to the same object, you can use the is operator.

a = 'apple'
b = 'apple'
print(a is b)

c = [1,2,3]
d = [1,2,3]
print(c is d)
print(c == d)
 
# An object with more than one reference has more than one name, so we say that the object is aliased.
e = d
print(e is d)
e[2] = 55
print(d)

# List arguments
def delelte_head(t):
    del t[0]
letters = ['a', 'b', 'c']
delelte_head(letters)
print(letters)

t1 = [1, 2]
t2 = t1.append(3)
print(t1)
print(t2) # None
t3 = t1 + [4]
print(t3)

# slice opertator create a new list