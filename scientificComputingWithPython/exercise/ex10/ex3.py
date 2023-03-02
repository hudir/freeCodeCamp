# Exercise 3: Write a program that reads a file and prints the letters in decreasing order of frequency. Your program should convert all the input to lower case and only count the letters a-z. Your program should not count spaces, digits, punctuation, or anything other than the letters a-z. Find text samples from several different languages and see how letter frequency varies between languages. Compare your results with the tables at wikipedia.org/wiki/Letter_frequencies.

# Fun fact: The word "tuple" comes from the names given to sequences of numbers of varying lengths: single, double, triple, quadruple, quituple, sextuple, septuple, etc.↩

# Python does not translate the syntax literally. For example, if you try this with a dictionary, it will not work as might expect.↩

abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
obj = dict()
for le in abc:
    obj[le] = 0

input = open('exercise/ex09/mbox-short.txt')

for line in input:
    for letter in line.lower():
        if letter in abc:
            obj[letter] = obj[letter] + 1

totol = sum([ v for v in obj.values()])
print(totol)

result =  sorted([ (v,k) for k,v in obj.items()], reverse=True)
for tp in result:
    print(tp[1], round(tp[0]/totol *1000) / 10 , '%')

# e 9.3 %
# a 8.9 %
# i 7.7 %
# o 7.1 %
# r 6.9 %
# t 6.9 %
# s 6.4 %
# u 5.3 %
# c 5.3 %
# n 4.4 %
# p 4.3 %
# m 4.2 %
# d 3.4 %
# l 3.1 %
# h 2.4 %
# f 2.1 %
# k 2.0 %
# b 1.9 %
# g 1.8 %
# v 1.7 %
# j 1.6 %
# y 1.1 %
# w 1.0 %
# x 0.8 %
# z 0.1 %
# q 0.1 %