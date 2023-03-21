class Category:
  title = None
  funds = None
  ledger = None

  def __init__(self, title):
     self.title = title
     self.ledger = list()
     self.funds = float()
     print(self.title, 'constructed')

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
     import math
     namelen = len(self.title)
     left = '*' * math.floor((30 - namelen) / 2)
     line = left + self.title + '*' * (30 - len(left) - namelen) + '\n'
     for row in self.ledger:
        print(row)
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
     print(line)
     
    


#   def create_spend_chart(categories):


food = Category('food')
food.deposit(100, 'sell drinks')
food.withdraw(2, 'bonbon')

entertainment = Category('entertainment')
entertainment.deposit(500, "sell pc")
entertainment.transfer(100, food)

food.get_balance()
entertainment.get_balance()


