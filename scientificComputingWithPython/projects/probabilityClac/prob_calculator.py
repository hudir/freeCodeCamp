import copy
import random
# Consider using the modules imported above.
random.seed(95)
class Hat:
    def __init__(self, **data) -> None:
        self.store = list()
        for ele in data.items():
            ball = ele[0]
            amount = ele[1]
            for i in range(amount) : self.store.append(ball)
        self.contents = copy.deepcopy(self.store)
    
    def draw(self, howmany):
        self.contents = copy.deepcopy(self.store)
        import math
        if howmany > len(self.contents) : return self.contents     
        # balls = copy.deepcopy(self.contents)
        # draw = list()
        # for i in range(howmany):
        #     index = math.floor(random.random() * len(balls))
        #     ball = balls[index]
        #     draw.append(ball)
        #     balls = balls[:index] + balls[index+1:]
        draw = list()
        for i in range(howmany):
            index = math.floor(random.random() * len(self.contents))
            print('random', index, end=" ")
            ball = self.contents[index]
            draw.append(ball)
            self.contents = self.contents[:index] + self.contents[index+1:]
        # print(draw, balls)
        getdict = dict()
        for ball in self.contents:
            if ball in getdict: getdict[ball] = getdict[ball] + 1
            else: getdict[ball] = 1
        print("\033[93mleft", getdict, end="\033[0m " )
        return draw

def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
    count = 0
    fail = 0
    for _ in range(num_experiments):
        get = hat.draw(num_balls_drawn)
        # print(get)
        want = copy.deepcopy(expected_balls)
        for ball in get:
            if ball in want: want[ball] = want[ball] -1
      
        getall = True
        for ele in want.items():
            if ele[1] > 0: 
                getall = False
                print('\033[95m',"lack " + str(ele[1]) + ' ' + ele[0], end='\033[0m, ')
                break

        getdict = dict()
        for ball in get:
            if ball in getdict: getdict[ball] = getdict[ball] + 1
            else: getdict[ball] = 1
            
        if getall : 
            count = count + 1
            print('\033[92m','succsee', getdict,'\033[0m')
        else:
            fail= fail+1
            print('\033[91m',"get " + str(getdict), '\033[0m')
            

    print('count', count, 'fail', fail)
    return count / num_experiments
            

# hat = Hat(blue=3,red=2,green=6)
# probability = experiment(hat=hat,
#                   expected_balls={"blue":2, "green":1},
#                   num_balls_drawn=4,
#                   num_experiments=1000)
# print(probability)

# hat1 = Hat(yellow=5,red=1,green=3,blue=9,test=1)
# probability1 = experiment(hat=hat1, expected_balls={"yellow":2,"blue":3,"test":1}, num_balls_drawn=20, num_experiments=100)
# print(probability1)

# hat = Hat(blue=1,red=1,green=1,gray=1)
# # print(hat.draw(1), end=" ")
# # print(hat.contents)
# # print(hat.store)
# probability = experiment(hat=hat,
#                   expected_balls={ "green":1},
#                   num_balls_drawn=1,
#                   num_experiments=1000)
# print(probability)