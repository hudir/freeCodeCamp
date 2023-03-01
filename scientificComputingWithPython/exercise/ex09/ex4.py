# Exercise 4: Add code to the above program to figure out who has the most messages in the file.

# After all the data has been read and the dictionary has been created, look through the dictionary using a maximum loop (see Section [maximumloop]) to find who has the most messages and print how many messages the person has.

# Enter a file name: mbox-short.txt
# cwen@iupui.edu 5

# Enter a file name: mbox.txt
# zqian@umich.edu 195


input = open('exercise/ex09/mbox-short.txt')
obj = dict()
for line in input:
    if line.startswith('From '):
        address = line.split()[1]
        obj[address] = obj.get(address, 0) + 1

name = None
most = None
for key,values in obj.items():
     if most is None or values > most:
        most = values
        name = key
print(name, most)
