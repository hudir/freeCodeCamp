
# Tuples are "immutable"  -- more effition than list
#  use and thory away

x = ('Glenn', 'Sally', 'Joseph')
print(x[2])

# Tuples and Assignment

# We can also put a tuple on the left-hand side of an assignment statement

(x, y) = (4, 'fred')
print(y, x)
(a, b) = (99, 98)
print(a, b)

d = dict()
d['csev'] = 2
d['cwen'] = 4
for (k,v) in d.items() :
    print(k, v)

# a list of tuples
tups = d.items()
print(tups) # dict_items([('csev', 2), ('cwen', 4)])


# Tuples are Comparable
# compare from the first element, if equal, goes to next element, once an element compair has a result, it will stop excution and return the boolean value

# It's only scans until it has a definitve answer
print((0, 1, 2) < (5, 1, 2)) # True
print((0, 1, 20000000) < (0, 3, 2)) # True
print(('Jones', 'Sally') < ('Jones', 'Sam')) # True
print(('Jones', 'Sally') > ('Adams', 'Sam')) # True

d = {
    'a':10,
    'c':22,
    'b':1
}
x = sorted(d.items())
print(x)

for k,v in sorted(d.items()):
    print(k,v)

# a list of values, where the values is first and key is second
tmp = list()

for k,v in d.items():
    tmp.append((v, k))


print(sorted(tmp, reverse=True))

# list comperhantion

print(sorted( [ (v,k) for k,v in d.items() ], reverse=True))