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


while True:
    line = input('> ')
    if line[0] == '#':
        continue
    if line == 'done' :
        break
    print(line)
print('Done!')