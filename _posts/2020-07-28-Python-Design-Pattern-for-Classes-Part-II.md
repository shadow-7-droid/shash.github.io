---
layout: post
category: Computer Science
date: 2020-07-28
seo_title: Python Design Pattern for Classes - Part II
---

Please read the [first part]({{ site.baseurl }}{% post_url 2020-07-22-Python-Design-Pattern-for-Classes-Part-I %}) as we’ll be using the previously derived results and build on the previous part’s code.


# A New Requirement

Our customers wanted a new function, `angle_to_grade` which will convert a return the gradient given an angle. So we implement the following function in our class:

```python
import math

def angle_to_grade(self, angle):
    return math.tan(math.radians(angle))*100

```

Is there a problem with the above? Not as such. But suppose our client wants to calculate gradient for 30 degrees. Need they have a Circle object for doing so? No, right. So this indicates that `angle_to_grade` should be a **static function**.

But if it’s a static function, why is it placed in a class? The reason is, to ease finding the function. Else, our clients won’t know where to look for. Hence the reason for static functions. Our code thus becomes:

```python
import math

class Circle(object):
    
    version = '0.5'
    
    @staticmethod
    def angle_to_grade(angle):
        return math.tan(math.radians(angle))*100

    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        return math.pi * self.radius ** 2.0 

    def perimeter(self):
        return 2.0 * math.pi * self.radius

    @classmethod
    def from_bbd(cls, bbd):
        radius = bbd / 2.0 / math.sqrt(2.0)
        return cls(radius)

```

# A New Request

One of our customers wants that area be calculated using perimeter. No other customer has an issue with this, so we go forward to implement it.

```python
import math

class Circle(object):
    
    version = '0.6b'
    
    @staticmethod
    def angle_to_grade(angle):
        return math.tan(math.radians(angle))*100

    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        p = self.perimeter()
        return math.pi * (p *0.5/math.pi)**2 

    def perimeter(self):
        return 2.0 * math.pi * self.radius

    @classmethod
    def from_bbd(cls, bbd):
        radius = bbd / 2.0 / math.sqrt(2.0)
        return cls(radius)
```

Is there an issue with this implementation? Think over it before moving on.

Let’s go back to the previous version 0.5, and create a `Tire`, and print its perimeter and area.

```python
t = Tire(20)
print(t.radius)
print(t.perimeter())
print(t.area())
```

Output:

```
20
157.07963267948966
1256.6370614359173
```

Now, let's see what the perimeter and area are in the beta version.

```python
t = Tire(20)
print(t.radius)
print(t.perimeter())
print(t.area())
```

Output:

```
20
157.07963267948966
1963.4954084936207
```

We broke the code for tires. This is because `self.perimeter()` calls `tire.perimeter()` for Tires, and this is the adjusted perimeter. So we tweak our code in a way that `self.perimeter()` refers to `Circle.perimeter()` only.

```python
import math

class Circle(object):
    
    version = '0.6b'
    
    @staticmethod
    def angle_to_grade(angle):
        return math.tan(math.radians(angle))*100

    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        p = self._perimeter()
        return math.pi * (p *0.5/math.pi)**2 

    def perimeter(self):
        return 2.0 * math.pi * self.radius
    
    _perimeter = perimeter

    @classmethod
    def from_bbd(cls, bbd):
        radius = bbd / 2.0 / math.sqrt(2.0)
        return cls(radius)

    """"
    Now since Tire does not have _perimeter, _perimeter points to perimeter of circle
    """
```

However, since this is a good idea for Circles, this is a good idea for Tires too. So they go and implement one for themselves.

```python
class Tire(Circle):
    def perimeter(self):
        return Circle.perimeter(self)*1.25
    _perimeter = perimeter
```

It would be better if we had someway of clarifying who the perimeter call belongs to. It would become very clear if we had a prefix, saying `Circle.perimeter` or `Tire.perimeter`. Turns out, Python has a feature for this. That is by using the `__` before a variable name.

```python
import math

class Circle(object):
    
    version = '0.6'
    
    @staticmethod
    def angle_to_grade(angle):
        return math.tan(math.radians(angle))*100

    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        p = self.__perimeter()
        return math.pi * (p *0.5/math.pi)**2 

    def __perimeter(self):
        return 2.0 * math.pi * self.radius
    
    def perimeter(self):
        return self.__perimeter()

    @classmethod
    def from_bbd(cls, bbd):
        radius = bbd / 2.0 / math.sqrt(2.0)
        return cls(radius)
```

Internally, `__perimeter` would resolve to `_Circle__perimeter`. So if the Tire people implement it too, their `__perimeter` would resolve to `_Tire__perimeter`. And thus there remains no ambiguity.

So say Tire people change their code to the following:

```python
class Tire(Circle):
    def perimeter(self):
        return self.__perimeter()
    def __perimeter(self):
        return Circle.perimeter(self)*1.25
```

As expected, the code works:

```python
t = Tire(20)
print(t.radius)
print(t.perimeter())
print(t.area())
```

Output:

```
20
157.07963267948966
1256.6370614359173
```

# Fifth Customer

Our fifth customer is a very important customer, and a very wealthy one too. They are offering to pay almost as much as all the four customers combined, but they have only one ask. We should not store the radius, but the diameter.

We cannot simply do that, as all our previous code would fail. And we’ll lose all our previous customers. If only we had some kind of **getters and setters**, and we had that in our code, we would have been able to save ourselves.

Turns out, Python does have something for this. Let’s see the code first, the explanation will follow.

```python
import math

class Circle(object):
    
    version = '1.0'
    
    @staticmethod
    def angle_to_grade(angle):
        return math.tan(math.radians(angle))*100

    def __init__(self, radius):
        self.radius = radius

    @property
    def radius(self):
        return self.diameter/2.0

    @radius.setter
    def radius(self, radius):
        self.diameter = 2.0 * radius

    def area(self):
        p = self.__perimeter()
        return math.pi * (p *0.5/math.pi)**2 

    def __perimeter(self):
        return 2.0 * math.pi * self.radius
    
    def perimeter(self):
        return self.__perimeter()

    @classmethod
    def from_bbd(cls, bbd):
        radius = bbd / 2.0 / math.sqrt(2.0)
        return cls(radius)
```

`@property` converts dotted access to method calls, i.e., `c.radius` will call the function `radius` in the `Circle` class. But, this means that `self.radius` should be a function call to `radius`, which returns the `radius`. How does then `self.radius = radius` work?

> `self.radius = radius` is resolved to calling the function with `@radius.setter` decorator.

Hence, all places where we either used radius or assigned radius continue to work.

# The Final Touches

Remember our first customer, who were calculating the average area of circles. Turns out, they want to find average of 10 million circles. So their use case is:

```python
n = 10000000
circles = [Circle(random()) for i in range(n)]
```

Let’s see how much memory we are using.

```python
import sys
sum([sys.getsizeof(c) for c in circles])/1024/1024
```

Doesn’t it feel weird to use so much memory for something which essentially stores a list of numbers? 

> Actually, this amount of memory is being used because there is a corresponding dictionary stored against every object.

So how do we prevent that from happening. We declare `slots`.

```python
import math

class Circle(object):
    
    version = '1'
    __slots__ = ['diameter']
    
    @staticmethod
    def angle_to_grade(angle):
        return math.tan(math.radians(angle))*100

    def __init__(self, radius):
        self.radius = radius

    @property
    def radius(self):
        return self.diameter/2.0

    @radius.setter
    def radius(self, radius):
        self.diameter = 2.0 * radius

    def area(self):
        p = self.__perimeter()
        return math.pi * (p *0.5/math.pi)**2 

    def __perimeter(self):
        return 2.0 * math.pi * self.radius
    
    def perimeter(self):
        return self.__perimeter()

    @classmethod
    def from_bbd(cls, bbd):
        radius = bbd / 2.0 / math.sqrt(2.0)
        return cls(radius)
```

Remember that this should be the very last step in our class design.

But wait. Doesn’t this break the Tire class?

> No. Because, if somebody inherits your code, the `slots` doesn’t inherit. Dictionary for each instance of Tire is still intact.

# Conclusion

The following points should summarise stuff up:

* Inheriting from objects to get the functionalities like slots

* Instance Variables unique to the instance

* Class Variables common across classes

* Regular Methods need “self” to operate on instance data

* Class Methods implement alternate constructors — a ‘cls’ parameter is passed to them for creating subclasses instances as well

* Static Methods attach functions to classes — they neither need “self”, nor “cls”, and improve discoverability of the function

* `property()` lets getter and setter methods be invoked automatically by attribute access

* The `__slots__` variable implements flyweight design patterns by suppressing instance dictionaries