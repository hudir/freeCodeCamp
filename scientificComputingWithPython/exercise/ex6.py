str = 'X-DSPAM-Confidence: 0.8475 '

start = None
last = None
index = 0

while index < len(str):
    try:
        float(str[index])
        if start is None:
            start = index
        else:     
            if last is None:
                try:
                    float(str[index+1])
                except:
                    last = index + 2
        index = index + 1
    except:
        index = index + 1
        continue
     
print(str[start:last])           