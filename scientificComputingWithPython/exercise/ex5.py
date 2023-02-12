def computNumber():
    total = 0
    count = 0

    while True:
        num = input('Enter a number: ')
        if num == 'done':
            print('total: ', total)
            print('count: ', count)
            print('average: ', total / count)
            break
        else:
            try:
                iNum = float(num)
            except:
                print('bad data')
                continue
            total = total + iNum
            count = count + 1

computNumber()