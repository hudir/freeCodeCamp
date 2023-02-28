# Write a program that reads the words in words.txt and stores them as keys in a dictionary. It doesn't matter what the values are. Then you can use the in operator as a fast way to check whether a string is in the dictionary.

input = open('ex1.py')
obj = dict()
for line in input:
    for key in line.split() :
        obj[key] = obj.get(key, 0) + 1

print(obj)