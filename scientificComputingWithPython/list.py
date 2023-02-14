# A list is a kind of Collection(arrry in javascript)
# A collection allows us to put many values in a single 'variable'
# a collection is nice because we can carry all many values around in one convenient package

friends = ['Joseph', 'Glenn', 'Sally']
for friend in friends:
    print('Happy New Year', friend)

print(friends[0])
print([1, 24, 76])
print(['red', 98.6, [5, 6]])

# List are Mutable
# String are not Mutable

nums = [1, 2, 3, 4, 5]
nums[0] = 1.1
print(nums)
print(len(nums))

# The range function returns a list of numbers that range from zero to one less than the parameter
list = range(3, 40, 3)
for n in list:
    print(n)

for i in range(len(friends)):
    print('Happy birthday', friends[i])