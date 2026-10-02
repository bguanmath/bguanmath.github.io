---
layout: single
title: "Landau Symbols: Big O and Little o"
permalink: /posts/2026-09-28-landau-symbols/
author_profile: true
last_modified_at: 2026-10-02
---

An approximation becomes more useful when we describe its error. Landau symbols, especially big $O$ and little $o$, let us compare an error with a chosen scale. We will introduce these symbols, then use the approximation of $\sqrt{10}$ to develop the idea of a Taylor polynomial.

## 1. Big $O$ and little $o$

Throughout this section, $x\to a$ is a specified limiting process, and $g(x)$ is nonzero when $x$ is sufficiently close to $a$, except possibly at $a$. The same definitions apply to one-sided limits and to $x\to\pm\infty$.

### Big $O$: a bounded ratio

> **Definition.** We write
>
> $$
> f(x)=O(g(x))\qquad
> \text{as}\quad x\to a
> $$
>
> if there is a constant $C>0$ such that
>
> $$
> \lvert f(x)\rvert\le C\lvert g(x)\rvert
> $$
>
> for all $x$ sufficiently close to $a$ in the domain, with $x\ne a$.


For a finite $a$, "sufficiently close" means $0<\lvert x-a\rvert<\delta$ for some $\delta>0$. For $x\to+\infty$, it means $x>M$ for some $M$.

Equivalently, $f/g$ remains bounded in absolute value. The constant $C$ is independent of $x$ in the specified region.

For example,

$$
3x^2=O(x^2),
\qquad
x^3=O(x^2)
\qquad \text{as}\quad x\to 0.
$$


For the second statement, $\lvert x\rvert<1$ gives $\lvert x^3\rvert\le\lvert x^2\rvert$. Big $O$ is an upper bound on relative size; it does not assert that the two functions have exactly the same order.

### Little $o$: a ratio tending to zero

> **Definition.** We write
>
> $$
> f(x)=o(g(x))\qquad
> \text{as}\quad x\to a
> $$
>
> if
>
> $$
> \lim_{x\to a}\frac{f(x)}{g(x)}=0.
> $$
>
> Equivalently, for every $\varepsilon>0$, we have $\lvert f(x)\rvert\le\varepsilon\lvert g(x)\rvert$ sufficiently close to the limit. Thus $f$ is negligible relative to $g$.

For example,

$$
x^3=o(x^2)\qquad
\text{as}\quad x\to 0,
$$

but $3x^2$ is not $o(x^2)$, because its ratio to $x^2$ is $3$.

<span style="color: #c62828;">Big $O$ and little $o$ are not restricted to infinitesimals.</span> They compare relative sizes even when functions grow without bound or oscillate without approaching a limit.

> **Example 1.** For every fixed $\varepsilon>0$,
>
> $$
> \ln x=O(x^\varepsilon)\qquad\text{as}\quad x\to\infty.
> $$
>
> In fact, the stronger statement $\ln x=o(x^\varepsilon)$ holds. L'Hôpital's rule gives
>
> $$
> \lim_{x\to\infty}\frac{\ln x}{x^\varepsilon}
> =\lim_{x\to\infty}\frac{1/x}{\varepsilon x^{\varepsilon-1}}
> =\lim_{x\to\infty}\frac1{\varepsilon x^\varepsilon}=0.
> $$
>
> Both $\ln x$ and $x^\varepsilon$ tend to infinity, but the logarithm grows more slowly than every positive power of $x$.

> **Example 2.**
>
> $$
> \sin x=O(1)\qquad\text{as}\quad x\to\infty,
> $$
>
> because $\lvert \sin x\rvert\le1$ for every real $x$. Here $O(1)$ means bounded; the function $\sin x$ itself has no limit at infinity.

<span style="color: #c62828;">Always specify the limiting process</span>: $x^2=o(x)$ as $x\to0$, whereas $x=o(x^2)$ as $x\to+\infty$.

### Asymptotic equivalence

> **Definition.** We write $f(x)\sim g(x)$ as $x\to a$ if
>
> $$
> \lim_{x\to a}\frac{f(x)}{g(x)}=1.
> $$
>
> We say that $f$ and $g$ are **asymptotically equivalent**.

For infinitesimals, this is precisely the equivalence introduced in the companion post, but neither function is required to tend to zero.

Asymptotic equivalence implies both $f=O(g)$ and $g=O(f)$. Indeed, if $f/g\to1$, then sufficiently close to the limit point,

$$
\frac12\le\left\lvert\frac{f(x)}{g(x)}\right\rvert\le\frac32.
$$


Thus $\lvert f\rvert\le(3/2)\lvert g\rvert$ and $\lvert g\rvert\le2\lvert f\rvert$. The converse fails even when both big-$O$ relations hold: as $x\to\infty$, the functions $f(x)=2x$ and $g(x)=x$ satisfy both bounds, but $f/g=2$, so $f\not\sim g$.

### Quotient limits and big $O$

| Notation | Behavior of the ratio |
| :--- | :--- |
| $f=O(g)$ | $f/g$ is bounded in absolute value |
| $f=o(g)$ | $f/g\to0$ |
| $f\sim g$ | $f/g\to1$ |

Little $o$ implies big $O$, but the converse is false: for example, $3x^2=O(x^2)$ but $3x^2\ne o(x^2)$ as $x\to0$.

> **Proposition.** If the quotient $f(x)/g(x)$ has a **finite limit** as $x\to a$, then $f(x)=O(g(x))$ as $x\to a$. The converse is false.

**Proof.** Let $f(x)/g(x)\to L\in\mathbb R$. By the definition of a limit, sufficiently close to the limit point,

$$
\left\lvert\frac{f(x)}{g(x)}-L\right\rvert<1.
$$

The triangle inequality gives

$$
\left\lvert\frac{f(x)}{g(x)}\right\rvert
\le\left\lvert\frac{f(x)}{g(x)}-L\right\rvert+\lvert L\rvert
<1+\lvert L\rvert.
$$


Taking $C=1+{\lvert L\rvert}$ proves the big-$O$ bound. $\square$

For a counterexample to the converse, take $f(x)=\sin x$ and $g(x)=1$ as $x\to\infty$. We have $f=O(g)$, but the quotient takes the values $1$ along $\pi/2+2\pi n$ and $-1$ along $3\pi/2+2\pi n$, so it has no limit.

The word **finite** is essential: $x^2/x=x\to+\infty$ as $x\to+\infty$, yet $x^2$ is not $O(x)$.

## 2. Leading term plus error

The symbols $O(g)$ and $o(g)$ describe classes of possible functions. An equation such as 

$$
f=g+o(g)
$$

means that the difference $f-g$ has the indicated size. Different occurrences of $o(g)$ may represent different error functions.

### An infinitesimal example

The familiar limit $\sin x/x\to1$ gives

$$
\frac{\sin x-x}{x}\longrightarrow0.
$$

Therefore,

$$
\boxed{\sin x=x+o(x)\qquad
\text{as}\quad x\to 0.}
$$

Here $x$ is the leading term, and $\sin x-x$ is an error negligible relative to $x$. Both the leading term and the error tend to zero.

More generally,

$$
f\sim g
\quad\Longleftrightarrow\quad
f=g+o(g),
$$

because $(f-g)/g=f/g-1$. See [Infinitesimals]({% post_url 2026-09-28-infinitesimals %}) for equivalent infinitesimals and their use in calculating limits.

### An example at infinity: counting primes

Let $\pi(x)$ denote the number of primes less than or equal to $x$; for example, $\pi(10)=4$. Here $\pi(x)$ is a counting function, not the circle constant. The **Prime Number Theorem** states that

$$
\pi(x)\sim\frac{x}{\log x}
\qquad\text{as}\quad x\to \infty,
$$

where $\log x=\ln x$ denotes the natural logarithm. See [NIST DLMF, equation 27.2.3](https://dlmf.nist.gov/27.2.E3).

In little-$o$ notation, this becomes

$$
\boxed{
\pi(x)=\frac{x}{\log x}
+o\!\left(\frac{x}{\log x}\right)
\qquad\text{as}\quad x\to \infty.
}
$$

Now the leading term tends to infinity. The formula says that the **relative error** tends to zero; it does not say that the absolute error tends to zero. This illustrates why Landau notation is useful for both vanishing and growing functions. The Prime Number Theorem is a deep result; here we use its statement only to illustrate the notation.

<img src="{{ '/images/posts/landau-prime-counting.svg' | relative_url }}"
     alt="The prime-counting staircase pi(x) and x/log x up to x=2000. At 2000 their values are 303 and approximately 263.13."
     style="width: 100%; height: auto;">

*Figure 1. The exact prime count $\pi(x)$ and its leading approximation $x/\log x$, plotted with GeoGebra. The latter is shown for $2\le x\le2000$, with $\log x=\ln x$.*

## 3. The best linear approximation: estimating the square root of 10

Since $10$ is close to the perfect square $9$, write

$$
x=9+h,
\qquad
\sqrt{x}=\sqrt{9+h}.
$$

We will approximate near $h=0$, then substitute $h=1$ to estimate $\sqrt{10}$.

### Constant approximation

The simplest approximation is to use $\sqrt9=3$ for $\sqrt{9+h}$. How large is the error? Rationalizing gives

$$
E_0(h)=\sqrt{9+h}-3
=\frac{h}{\sqrt{9+h}+3}.
$$

Since the denominator tends to $6$,

$$
\frac{E_0(h)}h\longrightarrow\frac16,
\qquad
E_0(h)=\frac h6+o(h).
$$


Thus the absolute error is asymptotic to $\lvert h\rvert/6$. The constant approximation has an $O(h)$ error, but not an $o(h)$ error: it misses the first-order change of the function. At $h=1$, it gives $\sqrt{10}\approx3$, with an absolute error of about $0.16228$.

To improve the approximation, we should let it change with $h$. The simplest choice is a linear polynomial, whose slope can be chosen to remove this first-order error.

### The "best" linear approximation

Among linear polynomials $A+Bh$, we seek one satisfying

$$
\sqrt{9+h}=A+Bh+o(h)
\qquad\text{as}\quad h\to 0.
$$

<img src="{{ '/images/posts/landau-linear-approximation.svg' | relative_url }}"
     alt="The graph of sqrt(x), the constant y=3, its tangent at (9,3), and a trial line y=A+B(x-9) with A=3 and B=0.30."
     style="width: 100%; height: auto;">

*Figure 2. A constant approximation, a trial line, and the tangent at $(9,3)$. Since $h=x-9$, the general line is $y=A+Bh=A+B(x-9)$. The viewing window is $-1\le x\le11$, $-0.5\le y\le4$; the square-root curve is defined only for $x\ge0$.*

This means that the error divided by $h$ tends to zero: the polynomial captures both the value and the first-order change of the function at $h=0$.

Taking the limit gives $A=3$. Next, rationalization gives

$$
\frac{\sqrt{9+h}-3}{h}
=\frac1{\sqrt{9+h}+3}
\longrightarrow\frac16.
$$

Consequently, $B=1/6$, and the unique linear polynomial with error $o(h)$ is

$$
\boxed{L(h)=3+\frac h6,
\qquad\text{i.e.,}\qquad
y\approx 3+\frac{x-9}{6}.}
$$

Indeed, any other slope $B$ with the same constant term produces

$$
\frac{\sqrt{9+h}-(3+Bh)}h\longrightarrow\frac16-B\ne0.
$$

A different constant term does not even give an error tending to zero. This proves that $L$ is the **best local linear approximation in the sense of an $o(h)$ error**. This is a statement about behavior near $h=0$, rather than an optimization of the error at the single point $h=1$ or over an entire interval.

In general, we have the following theorem.

> **Theorem.** If $f$ is differentiable at $a$, then the tangent line
>
> $$
> y=L_a(x)=f(a)+f'(a)(x-a)
> $$
>
> gives the unique best local linear approximation in the following sense:
>
> $$
> f(x)=L_a(x)+o(x-a)\qquad\text{as}\quad x\to a.
> $$
>
> Among all polynomials $A+B(x-a)$ of degree at most one, only $L_a$ has an error $o(x-a)$.

**Proof.** By the definition of the derivative,

$$
\frac{f(x)-L_a(x)}{x-a}
=\frac{f(x)-f(a)}{x-a}-f'(a)
\longrightarrow0.
$$

This proves the stated error estimate. To prove uniqueness, suppose

$$
f(x)=A+B(x-a)+o(x-a).
$$

Taking $x\to a$ and using continuity gives $A=f(a)$. Subtracting $f(a)$ and dividing by $x-a$ then gives

$$
\frac{f(x)-f(a)}{x-a}=B+o(1),
$$

so $B=f'(a)$. Therefore the tangent line is the only linear approximation with an error negligible relative to $x-a$. $\square$

For $f(x)=\sqrt{x}$ at $a=9$, the theorem gives $f(9)=3$ and $f'(9)=1/6$, recovering the line found above.

### The numerical approximation and its error

At $h=1$,

$$
\boxed{\sqrt{10}\approx L(1)=\frac{19}{6}=3.166666666\ldots.}
$$

The little-$o$ statement alone does not give a numerical error bound at $h=1$. Here we can obtain an exact error formula. Write $s=\sqrt{9+h}$. Then

$$
\begin{aligned}
\sqrt{9+h}-3-\frac h6
&=\frac h{s+3}-\frac h6\\[4pt]
&=-\frac{h^2}{6(s+3)^2}.
\end{aligned}
$$

Thus

$$
\sqrt{9+h}=3+\frac h6+O(h^2),
$$

which is stronger than an $o(h)$ error. At $h=1$, the approximation is an overestimate and

$$
0<L(1)-\sqrt{10}
=\frac1{6(\sqrt{10}+3)^2}
<\frac1{216}.
$$

## 4. A better approximation using a quadratic polynomial

For $\sqrt{9+h}$, even the best linear approximation leaves an error of order $h^2$. Indeed, the exact error formula from Section 3 gives

$$
\frac{\sqrt{9+h}-L(h)}{h^2}
=-\frac1{6(\sqrt{9+h}+3)^2}
\longrightarrow-\frac1{216}\ne0.
$$

The error is therefore $O(h^2)$, but not $o(h^2)$. To achieve an error negligible relative to $h^2$, a linear polynomial is no longer enough. 

We can now consider approximations that also capture the bending of the graph. One geometric approach is to use a **circular arc** that matches the curve locally. The resulting osculating circle motivates the geometric definition of **curvature**: the magnitude of curvature is the reciprocal of this circle's radius. Another approach is to use a polynomial of higher degree. The simplest extension of a linear polynomial is a **quadratic polynomial**, which is the approach we will take here.

Seek a quadratic polynomial $A+Bh+Ch^2$ such that

$$
\sqrt{9+h}=A+Bh+Ch^2+o(h^2).
$$

This condition forces $A=3$ and $B=1/6$, as before. To find $C$, use the limit of the linear error divided by $h^2$:

$$
\begin{aligned}
\frac{\sqrt{9+h}-3-h/6-Ch^2}{h^2}
&=-\frac1{6(\sqrt{9+h}+3)^2}-C\\
&\longrightarrow-\frac1{216}-C=0
\Longrightarrow C=-\frac1{216}.
\end{aligned}
$$

Therefore,

$$
\boxed{Q(h)=3+\frac h6-\frac{h^2}{216}.}
$$

<img src="{{ '/images/posts/landau-quadratic-approximation.svg' | relative_url }}"
     alt="The square-root curve, its tangent, and its best quadratic approximation at (9,3), with a local magnification from x=7.5 to x=10.5 in the same figure."
     style="width: 100%; height: auto;">

*Figure 3. The tangent and the best quadratic approximation, written in the horizontal coordinate $x=9+h$. The upper panel uses $-1\le x\le11$ and $-0.5\le y\le4$; the lower panel magnifies $7.5\le x\le10.5$. The quadratic curve nearly coincides with $y=\sqrt{x}$ near $(9,3)$.*

It satisfies

$$
\sqrt{9+h}=3+\frac h6-\frac{h^2}{216}+o(h^2).
$$

This is the unique quadratic polynomial with an $o(h^2)$ error. Once $A$ and $B$ are fixed, any other coefficient $C$ leaves an error whose ratio to $h^2$ tends to $-1/216-C\ne0$. This is the corresponding meaning of **best local quadratic approximation**.

### Estimating the square root of 10 again

At $h=1$,

$$
\boxed{\sqrt{10}\approx Q(1)=\frac{683}{216}=3.162037037\ldots.}
$$

We can again check the actual error without assuming that an asymptotic statement alone controls it at $h=1$. With $s=\sqrt{9+h}$,

$$
\begin{aligned}
\sqrt{9+h}-Q(h)
&=h^2\left(\frac1{216}-\frac1{6(s+3)^2}\right)\\[4pt]
&=\frac{h^2(s-3)(s+9)}{216(s+3)^2}\\[4pt]
&=\frac{h^3(s+9)}{216(s+3)^3}.
\end{aligned}
$$

The factor multiplying $h^3$ is bounded near zero. Hence the quadratic error is $O(h^3)$, and therefore $o(h^2)$.

At $h=1$, the error is positive, so $Q(1)$ is an underestimate. We have obtained two-sided bounds:

$$
\boxed{\frac{683}{216}<\sqrt{10}<\frac{19}{6}.}
$$

Using $\sqrt{10}=3.162277660\ldots$ to compare the numerical results:

| Approximation | Value, rounded | Absolute error, approximately |
| :--- | :--- | :--- |
| Linear: $19/6$ | $3.166666667$ | $0.004389006$ |
| Quadratic: $683/216$ | $3.162037037$ | $0.000240623$ |

The quadratic correction reduces the error by a factor of about $18$. The exact remainder formulas justify the improvement for this particular calculation.

## 5. Taylor polynomials

Our linear and quadratic approximations are the first two instances of a general construction.

> **Definition.** The **Taylor polynomial of degree at most $n$** for a function $f$ at $a$ is
>
> $$
> T_n(x)=\sum_{k=0}^{n}\frac{f^{(k)}(a)}{k!}(x-a)^k,
> $$
>
> provided these derivatives exist, with $f^{(0)}=f$ and $0!=1$.

Its coefficients ensure that the value and the first $n$ derivatives of $T_n$ match those of $f$ at $a$.

For example, if $f$ has continuous derivatives through order $n$ on a neighborhood of $a$, Taylor's theorem in its little-$o$ form gives

$$
\boxed{f(x)=T_n(x)+o\bigl((x-a)^n\bigr)\qquad
\text{as}\quad x\to a.}
$$

If $f$ has a continuous $(n+1)$st derivative on a neighborhood of $a$, we have the stronger estimate

$$
f(x)=T_n(x)+O\bigl((x-a)^{n+1}\bigr).
$$

More precisely, Taylor's theorem with remainder gives, for each nearby $x\ne a$, a point $\xi$ between $a$ and $x$ such that

$$
f(x)-T_n(x)
=\frac{f^{(n+1)}(\xi)}{(n+1)!}(x-a)^{n+1}.
$$

This formula provides numerical error bounds when the derivative can be bounded on the relevant interval.

### Recovering the quadratic approximation

For $f(x)=\sqrt{x}$ and $a=9$,

$$
f(9)=3,
\qquad
f'(x)=\frac1{2\sqrt{x}},
\qquad
f''(x)=-\frac1{4x^{3/2}}.
$$

Therefore,

$$
f'(9)=\frac16,
\qquad
\frac{f''(9)}{2!}=-\frac1{216}.
$$

The second Taylor polynomial is

$$
\boxed{
T_2(x)=3+\frac{x-9}{6}-\frac{(x-9)^2}{216}.
}
$$

Putting $x=9+h$ gives exactly $Q(h)$, the polynomial we derived directly from the error limits. Similarly, the first Taylor polynomial gives $L(h)$.

Since $f'''(x)=3/(8x^{5/2})$, Taylor's remainder theorem on $[9,10]$ gives

$$
0<\sqrt{10}-T_2(10)
\le\frac1{6}\cdot\frac{3}{8\cdot9^{5/2}}
=\frac1{3888}.
$$

### Why the Taylor polynomial is uniquely best in this local sense

Suppose a polynomial $P$ of degree at most $n$ also satisfies

$$
f(x)-P(x)=o\bigl((x-a)^n\bigr).
$$

Subtracting the corresponding relation for $T_n$ gives

$$
P(x)-T_n(x)=o\bigl((x-a)^n\bigr).
$$

If $P-T_n$ were nonzero, let $c(x-a)^k$ be its lowest nonzero term, with $k\le n$ and $c\ne0$. Dividing by $(x-a)^n$ would give a quantity tending to $c$ if $k=n$, or unbounded in absolute value if $k<n$. Neither tends to zero. Thus $P=T_n$.

Taylor polynomials therefore give the unique polynomial approximations that match the function through the specified order, with an error negligible relative to the last retained scale. This is the general principle behind our linear and quadratic estimates of $\sqrt{10}$.

---

*Last modified: {{ page.last_modified_at | date: "%B %-d, %Y" }}*
