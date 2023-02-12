# n = 5 # itration variable
# while n > 0:
#     print(n)
#     n = n - 1
# print('Blastoff')
# print(n)

# while True:
#     line = input('> ')
#     if line == 'done' :
#         break
#     print(line)
# print('Done!')


# while True:
#     line = input('> ')
#     if line[0] == '#':
#         continue
#     if line == 'done' :
#         break
#     print(line)
# print('Done!')


# # Definite loops
# for i in [5, 4, 3, 2, 1]:
#     print(i)
# print('Blastoff')

# friends = ['Joseph', 'Glenn', 'Sally']
# for fridend in friends:
#     print(fridend)
# print('Done!')

# # loop idioms
# largest_so_fat = -1
# print('Before')
# for thing in [9, 41, 12, 3, 74, 15] :
#     if thing > largest_so_fat:
#         largest_so_fat = thing
#     print(largest_so_fat, thing)
# print('After', largest_so_fat)

# Counting in a Loop
# zork = 0
# for thing in [9, 41, 12, 3, 74, 15]:
#     zork = zork + 1
# print(zork)

# total = 0
# for thing in [9, 41, 12, 3, 74, 15]:
#     total = total + thing
# print(total)

# count = 0
# sum = 0
# for thing in [9, 41, 12, 3, 74, 15]:
#     sum = sum + thing
#     count = count + 1
# print('Average: ', sum / count)

# for thing in [9, 41, 12, 3, 74, 15]:
#     if thing > 20:
#         print(thing)

# found = False
# for value in [9, 41, 12, 3, 74, 15]:
#     if value == 3:
#         found = True
#         break
# print(found)

smallest_so_far = None
for num in [9, 41, 12, 3, 74, 15]:
    if smallest_so_far is None: # is is stronger then ==
        smallest_so_far = num
    elif smallest_so_far > num:
        smallest_so_far = num
print(smallest_so_far)