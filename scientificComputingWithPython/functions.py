def thing():
    print('first function')

# thing()

# print(max('Hello world'))

# print(min('Hello world'))

def great(lang):
    if lang == 'es': return 'Hola'
    elif lang == 'fr': return 'Bonjour'
    elif lang == 'cn': return 'Ni hao'
    else: print('Hello')

print(great('es'))
print(great('fr'))
print(great('cn'))

