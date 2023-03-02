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

print( sorted([ (v,k) for k,v in obj.items()], reverse=True))