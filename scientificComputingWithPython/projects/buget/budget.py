class Category:
  def __init__(self, title):
     self.title = title
     self.ledger = list()
     self.funds = float()
   #   print(self.title, 'constructed')

  def deposit(self, *args):
    self.funds = self.funds + float(args[0])
    if len(args)  > 1 : 
       self.ledger.append({"amount": args[0], "description": args[1]})
    else: 
       self.ledger.append({"amount": args[0], "description": ''})

  def withdraw(self, *args):
     amount = float(args[0])
     if self.check_funds(amount) :
        self.funds = self.funds - amount
        if len(args)  > 1 : 
           self.ledger.append({"amount": 0 - args[0], "description": args[1]})
        else: 
           self.ledger.append({"amount": 0 - args[0], "description": ''})
        return True
     return False

  def check_funds(self, amount):
     if self.funds < amount : return False
     else : return True
  
  def transfer(self, amount, budget):
     destination = budget.title
     if self.check_funds(amount) :
        self.withdraw(amount, "Transfer to " + destination)
        budget.deposit(amount, "Transfer from " + self.title)
        return True
     return False
  def get_balance(self):
     return self.funds
  
  def __str__(self):
     import math
     namelen = len(self.title)
     left = '*' * math.floor((30 - namelen) / 2)
     line = left + self.title + '*' * (30 - len(left) - namelen) + '\n'
     for row in self.ledger:
        amout= row["amount"]
        des = row["description"]
        if len(des) > 23: des = des[:23]
        amout = str(amout)
        if amout.find('.') == -1 : amout = amout + '.00'
        decima = amout.split('.')[1]
        if len(decima) < 2 : amout = amout + '0'
        elif len(decima) > 2 : amout = amout.split('.')[0] + amout.split('.')[1][:2]
        spacelen = 30 - len(amout) - len(des)
        line = line + des + ' ' * spacelen + amout + '\n'

     funds = str(self.funds)
     decima = funds.split('.')[1]
     if len(decima) < 2 : funds = funds + '0'
     elif len(decima) > 2 : funds = funds.split('.')[0] + funds.split('.')[1][:2]

     line = line + "Total: " + funds
     return line
     

# food = Category('food')
# food.deposit(100, 'sell drinks')
# food.withdraw(2, 'bonbon')
# food.withdraw(20, 'bonbon')

# auto = Category('Auto')
# auto.deposit(100, 'sell drinks')
# auto.withdraw(2, 'bonbon')
# auto.withdraw(20, 'bonbon')

# entertainment = Category('entertainment')
# entertainment.deposit(500, "sell pc")
# entertainment.transfer(100, food)

# food.get_balance()
# entertainment.get_balance()


def create_spend_chart(categories):
    record = dict()
    totspent = 0
    maxlentitle = None
    for category in categories:
       if (maxlentitle is None) or maxlentitle < len(category.title): 
          maxlentitle = len(category.title)
       record[category.title] = 0
       for ledger in category.ledger:
           if float(ledger["amount"]) < 0:
              record[category.title] = record[category.title] + abs(ledger["amount"])
              totspent = totspent + abs(ledger["amount"])

    for category in list(record.items()):
       record[category[0]] = (record[category[0]] / totspent * 100)

    line = "Percentage spent by category\n"
    count = 100
    while count > -1:
       num = str(count)
       while len(num) < 3 : num = ' ' + num
       line = line + num + '| '
       for category in list(record.items()):
          if category[1] > count:
             line = line  + 'o' + '  '
          else : line = line + '   '
       line = line + '\n'
       count = count -10
    
    line = line + ' ' * 4 + '-'* (len(record) * 3 + 1)   + "\n"

    for index in range(maxlentitle):
       if not index == 0 :line = line + "  \n"
       line = line + ' ' * 3
       for category in list(record.items()):
          if len(category[0]) > index:
             line = line + '  ' + category[0][index]
          else : line = line + '   '

    line = line+'  '
       
    # print(line)
    return line


# create_spend_chart([food, entertainment])     

# print(create_spend_chart([food, entertainment, auto]))
