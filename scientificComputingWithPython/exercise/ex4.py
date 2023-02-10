def computPay(floatHours, floatRate):
    if floatHours > 40: 
        print('Overtim')
        reg = floatHours * floatRate
        otp = (floatHours - 40) * floatRate * 0.5
        xp = reg + otp
    else: 
        print('Regular')
        xp = floatHours * floatRate
    return xp


hours = input("Enter Hours: ")
rate = input("Enter Rate: ")

try: 
    floatHours = float(hours)
    floatRate = float(rate)
    print("Pay:", computPay(floatHours, floatRate))

except:
    print('Error, please enter numberic input')
    # quit()



 
