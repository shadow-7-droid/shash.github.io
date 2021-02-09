---
layout: post
category: Computer Science
date: 2020-07-22
seo_title: Python Design Pattern for Classes - Part I
---

An important thing when one moves from college to corporate is the need to understand others’ code, as well as to write code in a way that others find it easy to comprehend.

Another thing is that once a class is written, other developers might want to extend it to avoid effort duplication. However, many-a-times, we forget that the classes we are writing are not just for us, but for our children as well (ah, I like the puns).

Here goes an article based on a famous presentation by Raymond Hettinger.

# The Base Class

We want to build a module that would provide some geometrical calculations on a Circle. The following is our basic design:

```python
class Circle(object):

    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        return 3.14 * self.radius ** 2.0 
```

Despite being very basic, the above encapsulates some very important concepts:

* We inherit from `object` to get some functionalities. What functionalities exactly, would be discussed in the second part.
* Contrary to popular opinion, `__init__` is not a constructor. `__init__` is called after an instance is already created, and is used to populate the existing instance.
* Class is a namespace. Unlike cpp and Java, we can write print statements, open and close files inside class declarations, and these would run when the class is run. The following should make it more clear:

```python
class Circle(object):

    print('Hello World')

    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        return 3.14 * self.radius ** 2.0 
```

In the above case, **Hello World** is printed after the class declaration itself.

* `self` refers to the instance calling the function. We may name `self` as `this` or `s` or anything we like, but again, we want to convey our ideas to others who use our code. And the general practice is to use `self`.

# Some Minor Modifications?

## $$\pi$$

We are using 3.14 instead of $$\pi$$. A better idea would be to `import math` and use `math.pi` instead.

Follow up from a stubborn guy: What if I specify $$\pi$$ with a 32-bit precision and use it? That should be the same as `import math`, right? No. Suppose your code is run on a 64-bit machine. Using `math.pi` will automatically take care to convert it π to 64-bit precision. Hence, if there’s a library, understand that people have spent time building and optimising it. So use it.

## version

It’s a good practice to have versions. Since this is the very first try, let’s keep the version as 0.1. A couple of questions before we include that in our code:

1. Is the version instance specific? → No, it’s the same across all instances.
So it makes sense to keep the version as a class variable.

2. Which should we use, version = 0.1 or version = '0.1'?
* Firstly, is version 1.0 + version 1.1 = version 2.1? No.
* Secondly, it would have a very bad impact if someone printed the version, and it gave the result as 0.1000000000000000001. Makes the code look very bad. So, the better idea is to keep version as a string.

With the above two modifications, here is our initial code:

```python
import math

class Circle(object):
    
    version = '0.1'

    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        return math.pi * self.radius ** 2.0 
```

Shouldn’t we include a function for perimeter? A function for area of inscribed equilateral triangle? Another for area of circumscribed equilateral triangle? NO.

Do not put in features which may not be helpful. Unless the client wants it, there’s no use implementing it and wasting the resources. It’s better to have less features which are more often used than bombarding the class with features which clients have a tough time figuring out.

> With the Minimum Viable Product in hand, we ship it.

# First Customer

Our first customers want to calculate average area of circles, so they do the following:

```python
from random import random
n = 10
circles = [Circle(random()) for i in range(10)]
area = [c.area() for c in circles]
print(sum(area)/len(area))
```

Simple as this may be, this shows that our customer will create multiple instances of the class. And this is true for most use cases. But no worries now, our base class works good.

# Second Customer

The second customer wants to include a function for perimeter as well. Now would be a good time to write a function for perimeter.

```python
import math

class Circle(object):
    
    version = '0.2'

    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        return math.pi * self.radius ** 2.0 

    def perimeter(self):
        return 2.0 * math.pi * self.radius
```

The same customer uses the class as follows:

```python
radii = [1, 2, 3]
circles = [Circle(r) for r in radii]
for c in circles:
    print('Area before expansion: ', c.area())
    c.radius *= 1.1
    print('Area after expansion: ', c.area())
```

But wait a second. The customer changed the radius of the circle. This was an instance variable. Are we comfortable ‘exposing’ this?

> For Python, there’s no such thing as private and protected variables. Python leaves all doors unlocked.

Writing `c.set_radius(c.get_radius()*1.1)` would be tiresome, right? People might be wondering -- wouldn’t exposing create problems? We’ll look into this later on in the article.

# Third Customer

Our third customer is a Tire company, so they want to extend the `Circle` class. However, their demand is that the perimeter be multiplied by 1.25 to account for some adjustments.
So they implement the following:

```python
class Tire(Circle):
    def perimeter(self):
        return Circle.perimeter(self)*1.25
```

This again brings forth an important point:

> Expect modifications to your functions in subclasses.

# Fourth Customer

The fourth customer wants to create a circle given a bounding box diagonal. A bounding box is a square box which encloses the circle, and touches it at diametrically opposite points.

Given the diagonal of a bounding box, and a function `bbd_to_radius`, our customer uses the following to create Circles:

```python
c = Circle(bbd_to_radius(diagonal))
```
Doing the above every-time is tiresome, so a better way would be to provide an alternate constructor. So we modify our code:

```python
import math

class Circle(object):
    
    version = '0.3'

    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        return math.pi * self.radius ** 2.0 

    def perimeter(self):
        return 2.0 * math.pi * self.radius

    @classmethod
    def from_bbd(cls, bbd):
        radius = bbd / 2.0 / math.sqrt(2.0)
        return Circle(radius)
```

Using the above code enables the following use case for customer 4:

```python
c = Circle.from_bbd(25.1)
print(c.perimeter())
print(c.area())
```

Something’s Not Right

Yes, it would be good to ponder over what could be wrong before moving on. What breaks? Why? Think…

Our customer 4 ran the following, and got the desired output.

```python
c = Circle.from_bbd(25.1)
print(c.radius)
print(c.perimeter())
print(c.area())
```

Output:
```
8.874190103891172
55.7581808738875
247.4043484610132
```

However, we have other customers too. Our Customer 3 (The Tire people) saw the new `from_bbd` function and tried to use it. So they did the following:

```python
t = Tire.from_bbd(25.1)
print(t.radius)
print(t.perimeter())
print(t.area())
```

Output:
```
8.874190103891172
55.7581808738875
247.4043484610132
```

Shouldn’t their perimeter be adjusted? All they wanted was that their perimeter be multiplied by 1.25, but it’s not happening. Why not? Think before reading on ahead.

The reason is that we hardcoded `from_bbd` to return a `Circle` and forgot all about the subclasses which might inherit `Circle`.

Remember that the class is always passed as the first parameter to `@classmethod` functions. Hence, we use that to our advantage, and modify the `from_bbd` function as follows:

```python
@classmethod
def from_bbd(cls, bbd):
    radius = bbd / 2.0 / math.sqrt(2.0)
    return cls(radius)
```
Now doing the same operation on the Tire class gives the corrected perimeter.

```python
t = Tire.from_bbd(25.1)
print(t.radius)
print(t.perimeter())
print(t.area())
```

Output:

```
8.874190103891172
69.69772609235937
247.4043484610132
```

Our customers are satisfied now, but as popularity increases, so does use case, and so does number of customers. The next part will deal with some more customers, some more demands and trying to implement stuff without breaking the existing code.