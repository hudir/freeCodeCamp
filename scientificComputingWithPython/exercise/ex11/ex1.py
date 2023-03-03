# Exercise 1: Write a simple program to simulate the operation of the grep command on Unix. Ask the user to enter a regular expression and count the number of lines that matched the regular expression:

# $ python grep.py
# Enter a regular expression: ^Author
# mbox.txt had 1798 lines that matched ^Author

# $ python grep.py
# Enter a regular expression: ^X-
# mbox.txt had 14368 lines that matched ^X-

# $ python grep.py
# Enter a regular expression: java$
# mbox.txt had 4218 lines that matched java$
def grep():
   import re
   pettren = input('Enter a regular expression: ') 
   file = open('exercise/ex09/mbox-short.txt')
   count = 0
   for line in file:
      if re.search(pettren, line):
         count = count + 1

   print('mbox-short.txt has' ,count, 'lines that matched', pettren)

grep()