# working with lists
a = [1, 2, 3]
b = [4, 5, 6]
c = a + b
print(c)

# List can be sliced
t = [9, 41, 12, 3, 74, 15]
print(t[1:3])
print(t[:4])
print(t[3:])
print(t[:])

# List Methods
x = list()
print(type(x))
print(dir(x))
print(x)
x.append('book')
print(x)
x.append('cookie')
print(x)
x.append(99)
print(x)

some = [1, 9, 21, 10, 16]
print(9 in some)
print(15 in some)
print(2 not in some)

friends = ['Joseph', 'Glenn', 'Sally']
friends.sort()
print(friends) # ['Glenn', 'Joseph', 'Sally']

nums = [3, 41, 12, 9, 74, 15]
print(len(nums))
print(max(nums))
print(min(nums))
print(sum(nums))
print(sum(nums) / len(nums))


numlist = list()
while True:
    inp = input('Enter a number: ')
    if inp == 'done' : break
    value = float(inp)
    numlist.append(value)

average = sum(numlist) / len(numlist)
print('Average: ', average)