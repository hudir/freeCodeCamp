# Exercise 2: Write a program to look for lines of the form

# `New Revision: 39772`
# and extract the number from each of the lines using a regular expression and the findall() method. Compute the average of the numbers and print out the average.

# Enter file:mbox.txt
# 38549.7949721

# Enter file:mbox-short.txt
# 39756.9259259
import re
file = open('exercise/ex09/mbox-short.txt')
arr = list()

for line in file:
    result = re.findall('New Revision:\s(\d+)' ,line)
    if len(result) > 0:
        for x in result:
            x = float(x)
            arr.append(x)

print(sum(arr) / len(arr))