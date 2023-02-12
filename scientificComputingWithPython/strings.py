fruit = 'banana'
count = 0

# print(fruit[1])
# print(len(fruit))

# index = 0
# while index < len(fruit):
#     print(index, fruit[index])
#     index = index + 1

# for letter in fruit:
#     print(letter)

# for letter in fruit:
#     if letter == 'a':
#         count =  count + 1
# print(count)

# slice Strings
# s = 'Monty Python'
# print(s[0:4]) # the second num is not includ
# print(s[6:7])
# print(s[6:20])

# print(s[:2])
# print(s[8:])
# print(s[:])

# if 'nan' in fruit:
#     print('nan' in fruit)

# print('a' + 'b') # there is no space
# print('a', 'b') # there will be a space

# print('GREAT'.lower())

# stuff = 'Hello world'
# print(type(stuff))
# print(dir(stuff))

# string methods
# .upper()
# .lower()
# .find()
# .replace(oldStr, newStr) # replace all

# .lstrip() # delete space at beginning(left)
# .rstrip() # right side
# .strip() # both side

# .startswith()

data = 'From stephen.marqueard@uct.ac.za Sat Jan  5 09:14:16 2008'
atpos = data.find('@')
print(atpos)

sppos = data.find(' ', atpos)
host = data[atpos+1 : sppos]
print(host)