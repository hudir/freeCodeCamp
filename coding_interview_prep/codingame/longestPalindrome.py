
# Auto-generated code below aims at helping you parse
# the standard input according to the problem statement.

# s = input()
s= "CGTCATTCATGCGGAAGGGGTAAGACCATTAGAAGTAGGGATAGTCCCGAACCTCACTTACCACTCCCAATAAGGGATCCCTGTCTGAAGGATGAGTGTCAGCCAGTGTAACCCGATGAGGTACCCAGAAGCCGAACTGGGCCAGACAACCCGGCGCTAACGCACTCAAAGCCGGGACGCGACGCGACATATCGGCTAAGAGTAGGCCGGGAGTGTAGACCTTTGGGGTTGAATAAATCTGTCGTAGTAACCGGCT"

# Write an answer using print
# To debug: print("Debug messages...", file=sys.stderr, flush=True)


def check(str):
    if len(str) < 2: return False

    for i in range(int(len(str)/2)):
        if str[i] != str[len(str)-i-1] :
            
            return False
   
    return True

# print(check("aba"))

def getAllIndexes(char, text, currentIndex):
    res=[currentIndex]
    # i = currentIndex
    for i in range(len(text)):
        if i<currentIndex :
            i = currentIndex
            continue
        if text[i] == char and i != currentIndex:
            res.append(i)
    return res
       

def sliceStringBasedOnList(arr):
    res = list()
    for x in range(len(arr)):
        for y in range(len(arr)):
            if x>=y : 
                y = x 
                continue

            strToCheck = s[arr[x]:arr[y]+1]
            # print(strToCheck)
            if check(strToCheck) is True:
                # print(strToCheck)
                res.append(strToCheck)
    return res
            


checked = {}
res = {}
maxLen=-1

for j in range(len(s)):
    if s[j] not in checked:
        checked[s[j]] = True
        posiList = getAllIndexes(s[j], s, j)
        # print(posiList)
        if len(posiList) > 1:
            palindromeStr = sliceStringBasedOnList(posiList)
            if len(palindromeStr) > 0:
                for strToCheck in palindromeStr:
                    length = len(strToCheck) 
                    if length >=maxLen and check(strToCheck):
                        if length in res:
                            res[length].append(strToCheck)
                        else:
                            res[length] = [strToCheck]
                        if length > maxLen:
                            maxLen = length

for want in res[max(res.keys())]:
    print(want)

# print(res[index])
# print(maxLen)