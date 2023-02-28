counts = { 'hudir':1, 'zhuo':2, 'the': 3}

# for key in counts:
#     print(key,  counts[key])

print(counts.keys())
print(counts.values())
print(counts.items())


for key, value in counts.items() :
    print(key,  counts[key])