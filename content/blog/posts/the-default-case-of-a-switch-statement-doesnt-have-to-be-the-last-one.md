---
title: The `default` case of a `switch` statement doesn't have to be the last one
date: 2020-10-03
metaDescription: Sometimes it even makes sense to have the `default` case at the beginning or in the middle. Let's see how.
tags:
  - Clean code
intro: |
  Sometimes it even makes sense
  to have the `default` case at the beginning
  or in the middle.
  Let's see how.
---

[[toc]]

## Huh, that's possible?

If you think about all of the `switch` statements you have ever seen in your life,
I guess that in most of them,
the `default` case has been the last or almost last one.

I still remember how dumbfounded I was
when a friend of mine sent me
the following snippet of Unity code (C#)
that he had ~~copy-pasted~~ picked up from a course
he was following at the time:

```cs/4
void Update()
{
    switch (state)
    {
        default:
        case State.WaitingToStart:
            if (Input.GetKeyDown(KeyCode.Space) || Input.GetMouseButtonDown(0))
            {
                state = State.Playing;
                rb.bodyType = RigidBodyType2D.Dynamic;
                Jump();
            }
            break;
        case State.Playing:
            if (Input.GetKeyDown(KeyCode.Space) || Input.GetMouseButtonDown(0))
            {
                Jump();
            }
            break;
        case State.Dead:
            break;
    }
}
```

As you can see,
the `default` case is at the very top.

My initial thought was: dude, wtf, does this even compile?

I was so used to seeing the `default` case at the bottom
that I couldn't comprehend this.
It looked like an `if` statement
where the `else` branch is at the beginning.

I think my inner logic circuit deduced that
since the `default` case is the first one,
the other cases are not even checked.

But turns out that's not the case
(no pun intended).
The code above is perfectly valid
and even makes sense when you think about.
(We'll come back to this code snippet in
the [What about the Unity code?](#what-about-the-unity-code) section.)

## The position of the `default` case doesn't matter (unless there's a fallthrough)

After recovering from the shock of seeing that code,
I did some digging.
Like usual,
I headed straight to Stack Overflow
to see what people wiser than me have said.

Here's
[the highest-voted relevant SO question](https://stackoverflow.com/q/3110088 "Switch statement: must default be the last case?")
that I could find.
Let's see what the accepted answer by Secure says:

> The C99 standard is not explicit about this, but taking all facts together, it is perfectly valid.
>
> A `case` and `default` label are equivalent to a `goto` label. [...]
>
> All cases are evaluated, then it jumps to the default label, if given.

(The actual answer is more thorough with excerpts from the C99 standard.)

Here's what's said about
[JavaScript's `switch` statements on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch):

> A `switch` statement first evaluates its expression.
> It then looks for the first `case` clause
> whose expression evaluates to the same value as the result of the input expression
> [...]
>
> If no matching `case` clause is found,
> the program looks for the optional `default` clause
> [...]
> By convention, the `default` clause is the last clause, but it does not need to be so.

One more:
here's what Paul Dixon has answered to
[a relevant SO question in the context of PHP](https://stackoverflow.com/q/1241695 "default as first option in switch statement?")
and o'boy do I agree:

> It is an unusual idiom,
> it causes a little pause when you're reading it,
> a moment of "huh?".
> It works,
> but most people would probably expect to find the default case at the end.

Okay, you get the point:
the position of the `default` case doesn't matter in
C, C#, JavaScript, PHP,
and probably many other C-style languages as well &ndash;
_if_ there are no fallthroughs.

If there's a fallthrough (one or more) in the `switch` statement
(no `break` or `return` between cases),
the position of the `default` case might matter.
Fallthroughs are a common concept in `switch` statements,
but if this feels confusing,
don't worry.
The following code examples should clear this.

## Situations where a non-last `default` case can be useful

While putting the `default` case to the end is in my opinion normally the most intuitive option,
I found four distinct situations where a non-last `default` case can be beneficial.

(If you can think of other such situations,
please tell me!)

### Cases in logical order

Let's say you have cases from 1 to 3,
and the default case is number 2.

If you specify the cases so that the default case is the last one,
the order would be 1, 3 and 2/default.
It might instead be more intuitive to specify the cases in logical order:
1, 2/default and 3.
Like so:

```c
switch (foo) {
  case 1:
    // do something...
    break;
  case 2:
  default:
    // do something...
    break;
  case 3:
    // do something...
    break;
}
```

The more cases there are and the longer they are,
the more sense this probably makes.
On the other hand,
if the `default` case is in the middle
of a long and complex `switch` statement,
it might be easy to miss the `default` case.

I got this idea from
[an SO answer by Salil](https://stackoverflow.com/a/3110163).

### Normal case first

Let's say you have a situation where there's
a normal/default case
and a bunch of error cases.

If you put the normal case to the end,
it emphasizes the error cases.
Unnecessarily so,
especially if the error cases are uncommon.

I got this idea from
[an SO answer by kriss](https://stackoverflow.com/a/3110336)
which included this code example:

```c
switch (poll(fds, 1, 1000000)) {
  default:
    // here goes the normal case : some events occured
  break;
  case 0:
    // here goes the timeout case
  break;
  case -1:
     // some error occurred, you have to check errno
}}
```

kriss also talks about:

- recursion,
  which I have no opinion about
  because recursion also sometimes hurts my brain.
- performance optimization,
  which I'll also just skip over
  because it smells like premature optimization.
  (_Maybe_ it can be important
  if you are working with
  low-level, performance-critical code
  and not thinking about this prematurely.)

### Flow control with fallthroughs

If you are using a `switch` statement for flow control
(a series of steps)
and don't break between cases,
putting `default` to the beginning makes for a clear `switch` statement.

The following code example is adapted from
[an SO answer by DanielM](https://stackoverflow.com/a/19301402):

```c
switch (step) {
  default:
  case STEP_1:
    // do some stuff for step one
    // fallthrough
  case STEP_2:
    // this follows on from step 1 or you can skip straight to it
}
```

Another good example is
"a state machine where an invalid state should reset the machine and proceed as though it were the initial state,"
from [an SO answer by supercat](https://stackoverflow.com/a/3111684):

```c
switch (widget_state)
{
  default: /* Fell off the rails--reset and continue */
    widget_state = WIDGET_START;
    /* Fall through */
  case WIDGET_START:
    // ...
    break;
  case WIDGET_WHATEVER:
    // ...
    break;
}
```

This is not limited to state machines.
Take this example, adapted from
[an SO answer by Dan Larsen](https://stackoverflow.com/a/7198252):

```c
switch (color) {
  default:
    printf("No color selected so defaulting to ");
    // Fallthrough
  case COLOR_RED:
    printf("red");
    break;
  case COLOR_BLUE:
    printf("blue");
    break;
  case COLOR_GREEN:
    printf("green");
    break;
}
```

If `color` is red, blue or green,
the code will print
just the color.
Otherwise
(if `color` is e.g. yellow)
the code will print
"No color selected so defaulting to red."

Though maybe it would be clearer
to move the `default` case closer to the bottom
(unless you want to
[sort the cases in logical order](#cases-in-logical-order)):

```c
switch (color) {
  case COLOR_BLUE:
    printf("blue");
    break;
  case COLOR_GREEN:
    printf("green");
    break;
  default:
    printf("No color selected so defaulting to ");
    // Fallthrough
  case COLOR_RED:
    printf("red");
    break;
}
```

This is now similar to supercat's
"alternative arrangement [of the state machine where] an invalid state should not reset the machine
but should be readily identifiable as an invalid state":

```c
switch (widget_state)
{
  case WIDGET_IDLE:
    widget_ready = 0;
    widget_hardware_off();
    break;
  case WIDGET_START:
    // ...
    break;
  case WIDGET_WHATEVER:
    // ...
    break;
  default:
    widget_state = WIDGET_INVALID_STATE;
    /* Fall through */
  case WIDGET_INVALID_STATE:
    widget_ready = 0;
    widget_hardware_off();
    // ... do whatever else is necessary to establish a "safe" condition
}
```

### Preventing accidental fallthroughs to the `default` case

If the `default` case is the first one,
it's impossible for other cases
to accidentally fall through to the `default` case.

This idea is from
[an SO answer by JaredPar](https://stackoverflow.com/a/18470387).
He continues:
"This means `default` will run if, and only if,
the value matches no `case` statements in the `switch` block."

Using a linter would also help you
catch accidental fallthroughs,
so I don't know whether the confusion
caused by placing the `default` case to the top
outweighs the benefits.
(To be fair, JaredPar also writes:
"Note I'm not saying I agree with it,
this is simply the logic others have presented to me in the past.")

## So, should you use non-last `default` cases?

Unless you have a good reason to do otherwise,
it's probably safest to put the `default` case to the end.
This way anyone familiar with `switch` statements
can more easily understand the structure of your `switch` statement.

But if you have a good reason,
go ahead.
Just be prepared that your code might be initially rather confusing to other developers.

## What about the Unity code?

I would put the mindboggling code sent to me by my friend to the
[Cases in logical order](#cases-in-logical-order) category.
I think it also somewhat belongs to the
[Flow control with fallthroughs](#flow-control-with-fallthroughs) category.

After some thought,
it's actually logical to present the game states (`switch` cases)
in the order they have been presented:
"waiting to start," "playing" and "dead."
That's the natural flow of the game states.
The initial game state is "waiting to start,"
so the most logical position for the `default` case is at the beginning.

So, in the end,
the code was actually quite clever!
