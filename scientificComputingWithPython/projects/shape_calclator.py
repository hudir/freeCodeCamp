class Rectangle:
    def __init__(self, width, height) -> None:
        self.width = width
        self.height = height

    def set_width(self, width):
        self.width = width

    def set_height(self, height):
        self.height = height

    def get_area(self):
        return self.width * self.height
    
    def get_perimeter(self):
        return (self.width + self.height) * 2
    
    def get_diagonal(self):
        return (self.width ** 2 + self.height ** 2) ** 0.5
    
    def get_picture(self):
        if self.width > 50 or self.height > 50: return "Too big for picture."
        pic = ''
        for line in range(self.height):
            # if line > 0 : pic = pic + '\n'
            pic = pic + '*' * self.width + '\n'
        return pic

    def get_amount_inside(self, shap):
        import math
        x = math.floor(self.width / shap.width)
        y = math.floor(self.height / shap.height)

        howmany = None
        if x < 1 or y < 1: howmany = 0
        else: howmany = x * y
        return howmany
    
    def __str__(self) -> str:
        return "Rectangle(width=" + str(self.width) + ", height=" + str(self.height) + ")"


class Square(Rectangle):
    def __init__(self, sidelength) -> None:
        super().__init__(sidelength, sidelength)
    
    def set_side(self, len):
        print(self.height)
        self.height = len
        self.width= len

    def set_width(self, len):
        self.height = len
        self.width= len

    def set_height(self, len):
        self.height = len
        self.width= len
    
    def __str__(self) -> str:
        return "Square(side=" + str(self.width) + ")"


rect = Rectangle(10, 5)
print(rect.get_area())
rect.set_height(3)
print(rect.get_perimeter())
print(rect)
print(rect.get_picture())

sq = Square(9)
print(sq.get_area())
sq.set_side(4)
print(sq.get_diagonal())
print(sq)
print(sq.get_picture())

rect.set_height(8)
rect.set_width(16)
print(rect.get_amount_inside(sq))