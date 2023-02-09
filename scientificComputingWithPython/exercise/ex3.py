hours = input("Enter Hours: ")
rate = input("Enter Rate: ")

try: 
    floatHours = float(hours)
    floatRate = float(rate)

    if floatHours > 40: 
        print('Overtim')
        reg = floatHours * floatRate
        otp = (floatHours - 40) * floatRate * 0.5
        xp = reg + otp
    else: 
        print('Regular')
        xp = floatHours * floatRate

    print("Pay:", xp)

except:
    print('Error, please enter numberic input')
    # quit()