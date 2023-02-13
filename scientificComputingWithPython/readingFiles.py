# open(fileName, mode)
file1 = open('strings.py')
# print(file1) # <_io.TextIOWrapper name='strings.py' mode='r' encoding='UTF-8'>

# \n is one charactor
stuff = 'X\nY'
# print(stuff)
# print(len(stuff)) # 3

# for eachLine in file1:
    # print(eachLine)

# lineCount = 0
# for eachLine in file1:
#     lineCount = lineCount + 1
# print(lineCount)

# whole = file1.read()
# print(whole)

# for line in file1:
#     line = line.strip() 
#     if not line.startswith('#') | line.startswith('\n'):
#          print(line)
    
fname = input('Enter the file name: ')
try:
    fhand = open(fname)
except:
    print('File with the name', fname, 'not found')
    quit()
    
count = 0
for line in fhand:
    count = count + 1
print('There were', count, 'subject linesin', fname)

# fname = input('Enter the file name: ')
# try:
#     fhand = open(fname)
#     count = 0
#     for line in fhand:
#         count = count + 1
#     print('There were', count, 'subject linesin', fname)
# except:
#     print('File with the name', fname, 'not found')