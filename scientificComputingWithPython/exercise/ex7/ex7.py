# Exercise 1: Write a program to read through a file and print the contents of the file (line by line) all in upper case. Executing the program will look as follows:
file = open('exercise/ex7/ex7.py')
for line in file:
    line = line.rstrip().upper()
    print(line)


# Exercise 2: Write a program to prompt for a file name, and then read through the file and look for lines of the form:
fileName = input('exercise/ex7/ex7.py ')
try:
    file2 = open(fileName)
except:
    if fileName == 'na na boo boo':
        print("NA NA BOO BOO TO YOU - You have been punk'd!")
    else:
        print('Please enter path/name.')
    quit()

count = 0
value = 0
# X-DSPAM-Confidence:0.8475
for line in file2:
    line = line.strip()
    if line.startswith('X-DSPAM-Confidence:'):
        count = count + 1
        start = line.find(': ') + 2
        num = float(line[start:])
        value = value + num
if count is 0:
    print('nothing')
else:
    print('Average spam confidence:',  value / count)
        
# Exercise 3: Sometimes when programmers get bored or want to have a bit of fun, they add a harmless Easter Egg to their program Modify the program that prompts the user for the file name so that it prints a funny message when the user types in the exact file name "na na boo boo". The program should behave normally for all other files which exist and don't exist. Here is a sample execution of the program:

