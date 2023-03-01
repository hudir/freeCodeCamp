# Write a function called chop that takes a list and modifies it, removing the first and last elements, and returns None.

# Then write a function called middle that takes a list and returns a new list that contains all but the first and last elements.

def chop(list):
    del list[len(list)- 1]
    del list[0]
    return None

def middle(list):
    return list[1: len(list) - 1]


l1 = [1,1,2,3]
print(l1)

print(middle(l1))
print(l1)