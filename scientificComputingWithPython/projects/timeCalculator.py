# The function should add the duration time to the start time and return the result.

def add_time(*args):
    import math
    starttime = args[0]
    starttimenum = starttime.split()[0]
    starthour = int(starttimenum.split(':')[0])
    startminute = int(starttimenum.split(':')[1])

    ampm = starttime.split()[1] #'AM' or 'PM'
    duration = args[1]
    durationhour = int(duration.split(':')[0])
    durationminute = int(duration.split(':')[1])

    if ampm == 'PM': starthour = starthour + 12

    weekday = None
    if len(args) > 2: weekday = args[2].lower()

    week = ['monday', 'tuesday','wednesday', 'thursday', 'friday', 'saturday', 'sunday']

    # calc minutes
    endminutes = startminute + durationminute
    addtohour = math.floor( endminutes / 60 )
    outputminutes = endminutes % 60
    if outputminutes < 10: outputminutes = '0' + str(outputminutes)

    # calc hours
    endhours = starthour + durationhour + addtohour
    addtoday = math.floor( endhours / 24 )
    outputhour = endhours % 24

    if outputhour >= 12:
        ampm = 'PM'  
        outputhour = outputhour - 12
    else:  ampm = 'AM'

    if outputhour == 0: outputhour = 12
    
    whichday = None
    # calc day
    if addtoday == 1 : whichday='(next day)'
    elif addtoday > 1 : whichday = '(' + str(addtoday) + " days later" + ')'

    output = str(outputhour) + ':' + str(outputminutes) + ' ' + ampm

    newweekday = None
    if weekday is not None:
        # print(dir(list))
        newweekday = week[(week.index(weekday) + addtoday) % len(week)].capitalize()
        output = output + ', ' + newweekday

    if whichday is not None:
         output = output +' '+ whichday

    return output

add_time("11:43 PM", "24:20", "tueSday") # Returns: 12:03 AM, Thursday (2 days later)
add_time("3:00 PM", "3:10") # Returns: 6:10 PM
add_time("10:10 PM", "3:30")  # Returns: 1:40 AM (next day)
add_time("11:43 AM", "00:20")
print(add_time("8:16 PM", "466:02", "tuesday")) # 6:18 AM, Monday (20 days later)

# 12:03 AM, Thursday (2 days later)
# 6:10 PM
# 1:40 AM (next day)
# 12:03 PM