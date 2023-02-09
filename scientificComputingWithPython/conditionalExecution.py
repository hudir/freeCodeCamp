x = 5
if x < 10:
    print("Smaller then 10")
else:
    print("Bigger")

print('Finish')

# Indentation as code block
if x == 5:
    print('Equals 5')
if x >= 5:
    print('Greater than or Equals 5')
if x != 6:
    print('Not equal 6')

# nested indent
for i in range(5) :
    print(i)
    if i > 2 :
        print('Bigger than 2')
    print('Done with i ', i)
print('All Done')