---
layout: post
category: Mathematics
date: 2020-05-11
---

# The Question

Let C be a circle, with an equilateral triangle inscribed into it. 
If we select a chord at random, 
what is the probability that length of the chord is greater than the side of the equilateral triangle? 
An image is added for illustration.


{% include image.html
img="assets/images/so_you_think_you_know_your_spaces/circle_inscribed_triangle.png"
title="Circle With Inscribed Equilateral Triangle"
caption="Circle With Inscribed Equilateral Triangle" %}

# The Answer(s)?

Firstly, note that length of one side of equilateral triangle = r√3.

## Method 1

Suppose we select a point M in the circle. There is only one chord that has M as its midpoint.

{% include image.html
img="assets/images/so_you_think_you_know_your_spaces/chord_with_midpoint.png"
title="chord AB with M as midpoint"
caption="chord AB with M as midpoint" %}

**Proof**: Given a point M. If M is the midpoint of some chord, then CM will be the perpendicular bisector of the chord. So there is a unique chord perpendicular to CM and passing through M.

Now, we need to find when $$ AB > r \sqrt3 $$.

$$
\begin{aligned}
&(CM)² = r²- ((AB)²/4). \ \ \ \ \text{Also, AB} > r√3 \\
\implies &(CM)² < r²/4 \\
\implies &M < r/2
\end{aligned}
$$

So, M may lie anywhere within a circle of radius r/2. Hence, probability of choosing such a point is:
<center>$$ \pi * \frac{(r/2)^{2}}{\pi* r^2} = \frac{1}{4}$$ </center>

> So, probability of choosing a chord whose length is greater than the side of an inscribed equilateral triangle = 1/4.

## Method 2

Suppose we fix one of the end points of the chord. Suppose that this end point coincides with one of the vertices. Then we would have something like this:

{% include image.html
img="assets/images/so_you_think_you_know_your_spaces/fixing_end_point.png"
title="Fixing one end point of the chord on one of the vertices"
caption="Fixing one end point of the chord on one of the vertices" %}

The probability of the length of the chord being greater than the side of the triangle would be the same as probability of picking the second end point in the green region. The green region has length half as that of the red region.

> So, probability of choosing a chord whose length is greater than the side of an inscribed equilateral triangle = 1/3.

## Method 3

Consider a radius bisecting one of the sides of the triangle. Consider a point on the radius, and a chord passing through that point and perpendicular to the radius.

{% include image.html
img="assets/images/so_you_think_you_know_your_spaces/radius_bisecting.png"
title="Radius bisecting one of the sides of the inscribed triangle"
caption="Radius bisecting one of the sides of the inscribed triangle" %}

Our chord will be greater than the side of the triangle if the point is chosen on the green part of the radius.

Length of the green part = r/2.

> So, probability of choosing a chord whose length is greater than the side of an inscribed equilateral triangle = 1/2.

## Which Answer is Correct

And the answer is: **All of them**.

The above question is famous as Bertrand’s Paradox.

> And so we get 3 perfectly correct but different answers to the question. This example illustrates the very important fact that there may be equally valid but different ways of defining ‘randomness’. In the same situations it is not at all clear which is the “truly random” method.

So, do you know your underlying spaces?