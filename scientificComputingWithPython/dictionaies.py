# purse = dict()
# purse['money'] = 12
# purse['candy'] = 3
# purse['tissues'] = 75

# print(purse)

# purse['candy'] = purse['candy'] + 2
# print(purse['candy'])

# jjj = {
#     'chuck': 1,
#     'fred': 42,
#     'jan': 100
# }
# print(jjj)

# ooo = {}
# print(ooo)

# count = dict()
# names = ['zhen', 'cwen', 'csev','csev']
# for name in names :
#     if name in count:
#         count[name] = count[name] + 1
#     else :
#         count[name] = 1
# # print(count)

count = dict()
names = ['zhen', 'cwen', 'csev','csev']
for name in names :
    count[name] = count.get(name, 0) + 1

print(count)