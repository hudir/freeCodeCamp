# objects get created and used
class PartyAnimal:
    x=0

    def __init__(self):
        print('I am constructed')

    def party(self):
        self.x = self.x + 1
        print("So far", self.x) 

    def __del__(self):
        print('I am destructed', self.x)


print(123)
an = PartyAnimal()
print(345)

an.party()
an.party()
an.party()

# x = list()
# print(type(x))
# print(dir(x))

# y = 'Hello there'
# print(dir(y))

print(type(an))
print(dir(an))

an = 47
print('an contains',an)