---
layout: single
title: "The Number $e$ as a Limit"
permalink: /posts/2026-09-04-the-number-e-as-a-limit/
author_profile: true
last_modified_at: 2026-09-04
---

The number $e$ is one of the most important constants in mathematics. It appears naturally in calculus, differential equations, probability, and many other subjects. In this note, we define $e$ using the sequence
$$
a_n=\left(1+\frac1n\right)^n
$$
and then extend this result from integer values of $n$ to real variables.

## 1. The Monotonic Sequence Theorem

We begin with a fundamental result about sequences.

> **Monotone Convergence Theorem.** (Varberg, \S9.1 Theorem D) 
> If $U$ is an upper bound for a nondecreasing sequence $\{a_n\}$, then the sequence converges to a limit $A$ that is less than or equal to $U$.

More precisely, if $a_1\leq a_2\leq a_3\leq\cdots$ and there is a number $M$ such that $a_n\leq M$ for every $n$, then the sequence $\{a_n\}$ converges. In fact, its limit is the least upper bound of the set $\{a_1,a_2,\ldots\}$.

> **Question.**
> Consider the sequence
> $$
> a_n=\left(1+\frac 1n\right)^n.
> $$
> Prove that $\{a_n\}$ is increasing and bounded above by $3$.

### (i) The sequence is increasing.

By the Binomial Theorem,
$$
\begin{aligned}
a_n
&=\sum_{k=0}^{n}\binom{n}{k}\frac 1{n^k} \\[4pt]
&=\sum_{k=0}^{n}\frac{n(n-1)(n-2)\cdots(n-k+1)}{k!\cdot n^k} \\[4pt]
&=1+\sum_{k=1}^{n}
\frac 1{k!}\cdot
\underbrace{
(1)
\left(1-\frac1n\right)
\left(1-\frac2n\right)
\cdots
\left(1-\frac{k-1}{n}\right)
}_{k\text{ factors}}.
\end{aligned}
$$
We write the $k$th summand as $b_k$ such that $a_n=\sum_{k=0}^{n}b_k$.
- For $k=0$ or $k=1$, the corresponding terms $b_0$ and $b_1$ are both equal to $1$.
- For every fixed $k\geq 2$, each factor
$$
1-\frac{j}{n},
\qquad 1\leq j\leq k-1,
$$
increases when $n$ is replaced by $n+1$. Therefore, each term already appearing in the sum for $a_n$ does not decrease when we pass to $a_{n+1}$.

Moreover, comparing with $a_n$, the binomial expansion of $a_{n+1}$ contains one additional positive term $b_{n+1}$. It follows that $a_{n+1}>a_n$. Thus, $\{a_n\}$ is strictly increasing.

### (ii) The sequence is bounded above by $3$.

Every factor in the product above is at most $1$, so
$$
a_n
\leq
\sum_{k=0}^{n}\frac1{k!}
=
2+\sum_{k=2}^{n}\frac1{k!}.
$$
For $k\geq 2$, we have
$$
k!\geq 2^{k-1}.
$$
Consequently,
$$
\begin{aligned}
a_n
&\leq
2+\sum_{k=2}^{n}\frac1{2^{k-1}} \\[4pt]
&<
2+\sum_{k=2}^{\infty}\frac1{2^{k-1}}=3.
\end{aligned}
$$
Therefore, $a_n<3$ for every positive integer $n$.

### (iii) Conclusion.

The sequence $\{a_n\}$ is increasing and bounded above. By the Monotonic Sequence Theorem, it has a finite limit. We define the number $e$ by
$$
\boxed{
e=\lim_{n\to\infty}\left(1+\frac1n\right)^n
}.
$$
In particular, $2< e\leq 3$. Its approximate value is $e\approx 2.718281828\ldots$.

## 2. Three forms of the limit

The limit defining $e$ is commonly written in the following three forms:
$$
\boxed{
\lim_{n\to\infty}
\left(1+\frac1n\right)^n=e
}
$$
for positive integers $n$,
$$
\boxed{
\lim_{x\to\infty}
\left(1+\frac1x\right)^x=e
}
$$
for positive real numbers $x$, and
$$
\boxed{
\lim_{h\to 0}
(1+h)^{1/h}=e
}.
$$

The first statement concerns only the values $x=1,2,3,\ldots$, whereas the second statement concerns every sufficiently large real number $x$. Therefore, the second statement is stronger than the first. In general, knowing the values of a function along the positive integers does not determine its behavior between consecutive integers. Thus, the implication
$$
\lim_{n\to\infty}
\left(1+\frac1n\right)^n=e
\quad\Longrightarrow\quad
\lim_{x\to\infty}
\left(1+\frac1x\right)^x=e
$$
is not automatic and requires a proof. See Section 3.

The third statement is stronger still because $h\to 0$ is a two-sided limit. The case $h\to 0^+$ corresponds to $x\to+\infty$, while the case $h\to 0^-$ corresponds to $x\to-\infty$. See Sections 4 and 5.

The graph below shows the function
$$
f(x)=\left(1+\frac1x\right)^x.
$$
Its real-valued domain is $(-\infty,-1)\cup(0,\infty)$ (since we require that $1+1/x>0$). The two horizontal ends of the graph both approach $y=e$.

![The graph of y=(1+1/x)^x]({{ "/images/posts/e-limit-x.png" | relative_url }})

*Figure 1. The graph of $y=(1+1/x)^x$, with the horizontal asymptote $y=e$.*

After making the substitution $x=1/h$, the same limit can be expressed using
$$
g(h)=(1+h)^{1/h}.
$$

![The graph of y=(1+h)^(1/h)]({{ "/images/posts/e-limit-h.png" | relative_url }})

*Figure 2. The graph of $y=(1+h)^{1/h}$, with the removable discontinuity at $h=0$ and the limiting value $e$.*

## 3. Extending the limit from integers to positive real numbers

> **Question.**
> Knowing that
> $$
> \lim_{n\to\infty}\left(1+\frac 1n\right)^n=e,
> $$
> use the Squeeze Theorem to prove that
> $$
> \lim_{x\to\infty}\left(1+\frac 1x\right)^x=e.
> $$

Let $n=\llbracket x\rrbracket$, so that $n\leq x<n+1$.

Because all the bases below are greater than $1$, we have
$$
\left(1+\frac1{n+1}\right)^n
\leq
\left(1+\frac1x\right)^n
\leq
\left(1+\frac1x\right)^x
\leq
\left(1+\frac1x\right)^{n+1}
\leq
\left(1+\frac1n\right)^{n+1}.
$$
The expression on the left satisfies
$$
\left(1+\frac1{n+1}\right)^n
=
\frac{
\left(1+\frac1{n+1}\right)^{n+1}
}{
1+\frac1{n+1}
}.
$$

As $n\to\infty$, its numerator tends to $e$ by the definition of $e$, while its denominator tends to $1$. Hence,
$$
\lim_{n\to\infty}
\left(1+\frac1{n+1}\right)^n=e.
$$
Similarly,
$$
\lim_{n\to\infty}
\left(1+\frac1n\right)^{n+1}
=
\lim_{n\to\infty}
\left(1+\frac1n\right)^n
\left(1+\frac1n\right)
=e\cdot 1=e.
$$

Both the lower and upper bounds tend to $e$. The Squeeze Theorem now gives
$$
\boxed{
\lim_{x\to\infty}
\left(1+\frac1x\right)^x=e
}.
$$

This is the nontrivial step that extends the result from positive integers to
all sufficiently large positive real numbers.

## 4. The limit as $x\to -\infty$

> **Question.** (Varberg, \S2.6 Exercise 58)
> Knowing that
> $$
> \lim_{x\to\infty}\left(1+\frac 1x\right)^x=e,
> $$
> prove that
> $$
> \lim_{x\to-\infty}\left(1+\frac 1x\right)^x=e.
> $$

Set $t=-x$. Then $t\to\infty$ as $x\to-\infty$. For $x<-1$ (and hence $t>1$),
$$
\begin{aligned}
\left(1+\frac1x\right)^x
&=
\left(1-\frac1t\right)^{-t} \\[4pt]
&=
\left(\frac{t}{t-1}\right)^t \\[4pt]
&=
\left(1+\frac1{t-1}\right)^t.
\end{aligned}
$$

Let $s=t-1$. Then $s\to\infty$ and
$$
\begin{aligned}
\left(1+\frac1{t-1}\right)^t
&=
\left(1+\frac1s\right)^{s+1} \\[4pt]
&=
\left(1+\frac1s\right)^s
\left(1+\frac1s\right).
\end{aligned}
$$
The first factor tends to $e$, and the second factor tends to $1$. Therefore,
$$
\boxed{
\lim_{x\to-\infty}
\left(1+\frac1x\right)^x=e
}.
$$

## 5. The limit as $h\to 0$

> **Question.** (Varberg, \S2.6 Exercise 58)
> Knowing that
> $$
> \lim_{x\to\pm\infty}\left(1+\frac 1x\right)^x=e,
> $$
> prove that
> $$
> \lim_{h\to 0}(1+h)^{1/h}=e.
> $$

Finally, let $x=1/h$. Then
$$
\left(1+\frac1x\right)^x
=
(1+h)^{1/h}.
$$
If $h\to0^+$, then $x\to+\infty$, so
$$
\lim_{h\to0^+}(1+h)^{1/h}=e.
$$
If $h\to0^-$, then $x\to-\infty$, so
$$
\lim_{h\to0^-}(1+h)^{1/h}=e.
$$
The left-hand and right-hand limits are equal. Hence,
$$
\boxed{
\lim_{h\to0}(1+h)^{1/h}=e
}.
$$

We have therefore established the three related formulas
$$
\boxed{
e
=
\lim_{n\to\infty}\left(1+\frac1n\right)^n
=
\lim_{x\to\infty}\left(1+\frac1x\right)^x
=
\lim_{h\to0}(1+h)^{1/h}
}.
$$

Although these formulas have similar appearances, passing from the integer-valued limit to the real-variable limits requires the arguments given above.

---

*Last modified: {{ page.last_modified_at | date: "%B %-d, %Y" }}*