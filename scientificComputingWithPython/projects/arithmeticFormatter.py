def arithmetic_arranger(*args):
    import re
    list = args[0]
    res = None
    if len(args) > 1:
        if args[1] :
            res = True
    
    # ERROR
    if len(list) > 5: return 'Error: Too many problems.'

    line1 =''
    line2 =''
    line3 =''
    line4 =''

    for ele in list:
        operator = ele.split()[1]
        num1 = ele.split()[0]
        num2 = ele.split()[2]
        len1 = len(num1)
        len2 = len(num2)
        all = str(num1) + str(num2)
        if not (operator == '+' or operator == '-'): return "Error: Operator must be '+' or '-'."       
        if not re.findall('[0-9]+', all)[0] == all : return "Error: Numbers must only contain digits."
        if len1 > 4 or len2 > 4: return "Error: Numbers cannot be more than four digits."

        maxlen = 0
        if len1 > len2: maxlen = len1
        else: maxlen = len2
        maxlen = maxlen + 2

        line1 = line1 + ' ' * (maxlen - len1) + num1 + ' ' * 4
        line2 = line2 + operator + ' ' * (maxlen - len2 - 1) +  num2 + ' ' * 4
        line3 = line3 + '-' * maxlen + ' ' * 4

        # calc the result
        equs = 0
        if operator == '+':
            equs = int(num1) + int(num2)
        else:
            equs = int(num1) - int(num2)
        equs = str(equs)
        len3 = len(equs)
        line4 = line4 + ' ' * (maxlen - len3) + equs + ' ' * 4

    output = line1.rstrip() + '\n' + line2.strip() + '\n' + line3.strip() 
    if res: output = output + '\n' + line4.rstrip()
    return output


print(arithmetic_arranger(["1 + 2", "1 - 9380"]))
print(arithmetic_arranger(["32 + 8", "1 - 3801", "9999 + 9999", "523 - 49"], True))
