import copy
import random
# Consider using the modules imported above.

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
            ball = self.contents[index]
            draw.append(ball)
            self.contents = self.contents[:index] + self.contents[index+1:]
        # print(draw, balls)
        return draw

def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
    count = 0
    for i in range(num_experiments):
        get = hat.draw(num_balls_drawn)
        want = copy.deepcopy(expected_balls)
        for ball in get:
            if ball in want: want[ball] = want[ball] -1
        
        getall = True
        for ele in want.items():
            if ele[1] > 0: 
                getall = False
                break
        if getall : count = count + 1
    print('result', count / num_experiments)
    return count / num_experiments
            





hat = Hat(blue=3,red=2,green=6)
probability = experiment(hat=hat,
                  expected_balls={"blue":2,"green":1},
                  num_balls_drawn=4,
                  num_experiments=1000)
print(probability)