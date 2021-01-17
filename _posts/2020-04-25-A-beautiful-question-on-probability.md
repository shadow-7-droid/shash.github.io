---
layout: post
category: Mathematics
date: 2020-04-25
---

# Question:

An adversary proposes a game to you and your friend :

You and your friend will be kept in separate rooms, and each of you will toss a coin. If both of you correctly predict the other’s outcome, you’ll get 3 dollars.

The game costs 1 dollar per round. Being a mathematician, would you play this game?


# Initial Approach:

The first calculation which most people do is the following:

* Probability that you guess your friend’s outcome correctly $$ = 0.5 $$

* Probability that your friend guesses your outcome correctly $$ = 0.5 $$

* Probability of both events occurring together $$ = 0.25 $$

* Expected income $$ = (0.25*$3) = $0.75 $$

* You pay $$ = $1 $$

So you judge not to go ahead with the game.

However, can you think of a strategy by which your expected gain is more than $1?
I urge you to think more on this before reading ahead.


# Coming Up With The Strategy

Presently we are guessing correctly 1 in every 4 times. How to improve on that?

## The Intuition

We had 4 outcomes. Out of these, 1 was favourable.

>How to modify/think of the event space in such a way that there are total 2 outcomes?

Think of the outcomes in the following terms:

How many times do you and your friend get the same outcome?

> 2(HH, TT) in every 4 times (HH, HT, TH, TT).

## The Strategy

Your guess value is whatever your coin’s outcome is.
Your friend’s guess value is whatever his coin’s outcome is.

## The Analysis

At the first glance, it appears that you have a 0.5 probability of being correct. So does your friend.

>But, the two events — you guessing correctly and your friend guessing correctly — are no longer independent.

If you list down all coin toss outcomes, and all guesses, you’ll find that the guess event space is same as coin toss outcome event space (HH, TT, HT, TH), and that both you and your friend are guessing correctly 2 out of 4 times.

Clearly, you should play this game, and your expected gain is:
$$ (0.5*$3)-$1 = $0.5 $$

# The Beauty

This was one of the rare cases I came across where such a simple strategy could be devised to win in the game which seemed probabilistically impossible to win.
This, indeed, was one of the most beautiful questions I came across.
