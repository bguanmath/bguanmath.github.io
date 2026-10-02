---
layout: single
title: "Infinitesimals"
permalink: /posts/2026-09-28-infinitesimals/
author_profile: true
last_modified_at: 2026-10-01
---

When two functions both tend to zero, one may vanish much faster than the other, or they may have the same leading behavior. These comparisons help us simplify limits and describe approximation errors.

## 1. Infinitesimals and their comparison

### What is an infinitesimal?

> **Definition.** A function $\alpha(x)$ is an **infinitesimal as $x\to a$** if
>
> $$
> \lim_{x\to a}\alpha(x)=0.
> $$

Here an infinitesimal means a function tending to zero in a specified limiting process. *It does not mean a fixed, very small nonzero real number.* For example, $x$, $x^2$, and $\sin x$ are infinitesimals as $x\to0$, while $1/x$ is an infinitesimal as $x\to\infty$.

The definitions below also apply to one-sided limits and limits at infinity. All functions are considered on a common domain along the stated limiting process, and every function used as a denominator is assumed to be nonzero sufficiently close to the limit point, except possibly at the point itself.

### Higher-order infinitesimals

> **Definition.** Let $\alpha(x)$ and $\beta(x)$ be infinitesimals as $x\to a$. We say that $\alpha$ is a **higher-order infinitesimal than $\beta$** if
>
> $$
> \lim_{x\to a}\frac{\alpha(x)}{\beta(x)}=0.
> $$
>
> We write $\alpha(x)=o(\beta(x))$ as $x\to a$.

Thus, $\alpha$ becomes negligible **relative to $\beta$**. The phrase "higher order" describes this relative behavior; it does not require either function to be a power of $x$.

For example, let $n$ be a positive integer. As $x\to0$, $x^{n+1}$ tends to zero faster in magnitude than $x^n$. Indeed, we have

$$
\frac{x^2}{x}=x\to0,
\qquad
\frac{x^3}{x^2}=x\to0,
\qquad
\frac{x^{n+1}}{x^n}=x\to0.
$$

Therefore, $x^2=o(x)$, $x^3=o(x^2)$, $x^{n+1}=o(x^n)$ as $x\to 0$.

### Equivalent infinitesimals

> **Definition.**  As $x\to a$, two infinitesimals $\alpha(x)$ and $\beta(x)$ are said to be **equivalent** if
>
> $$
> \lim_{x\to a}\frac{\alpha(x)}{\beta(x)}=1.
> $$
>
> We write $\alpha(x)\sim\beta(x)$ as $x\to a$.

Equivalence means that the ratio tends to $1$, not that the two functions are equal. For example,

$$
\lim_{x\to0}\frac{\sin x}{x}=1
\quad\Longrightarrow\quad
\sin x\sim x
\quad\text{as}\quad x\to0.
$$

By contrast, $2x$ and $x$ are not equivalent: their ratio is $2$.

### Basic equivalent infinitesimals

The following formulas all hold <span style="color: #c62828;">as $x\to0$</span>, with angles measured in radians:

| Function | Equivalent infinitesimal |
| :--- | :--- |
| $\sin x$ | $x$ |
| $\tan x$ | $x$ |
| $\arcsin x$ | $x$ |
| $\arctan x$ | $x$ |
| $\ln(1+x)$ | $x$ |
| $e^x-1$ | $x$ |
| $(1+x)^r-1$ | $rx$, for fixed $r\in\mathbb R\setminus\{0\}$ |
| $1-\cos x$ | $x^2/{2}$ |

One can prove these formulas directly by definition. For example, the last formula comes from the identity $1-\cos x=2\sin^2(x/2)$:

$$
\lim_{x\to0}\frac{1-\cos x}{x^2/2}
=\lim_{x\to0}\left(\frac{\sin(x/2)}{x/2}\right)^2
=1.
$$

We may also replace the argument $x$ by a function $u(x)\to0$, provided the expressions and ratios are defined near the limit. For example,

$$
\sin(3x)\sim3x,
\qquad
\sqrt{1+x^3}-1\sim\frac{x^3}{2}
\qquad(x\to0).
$$

Using this idea, we give a proof of $(1+x)^r-1\sim rx$ for $x\to0$ and $r\ne0$:

$$
(1+x)^r-1=e^{r\ln(1+x)}-1
\sim r\ln(1+x)\sim rx.
$$

## 2. Using equivalent infinitesimals to calculate limits

> **The Replacement Theorem.** Suppose that, as $x\to a$,
>
> $$
> \alpha(x)\sim\widetilde\alpha(x),
> \qquad
> \beta(x)\sim\widetilde\beta(x),
> $$
>
> where all four functions are infinitesimals and are nonzero when $x$ is sufficiently close to $a$, apart from possibly at $a$. Then
>
> $$
> \lim_{x\to a}\frac{\alpha(x)}{\beta(x)} = \lim_{x\to a}\frac{\widetilde\alpha(x)}{\widetilde\beta(x)}.
> $$
>
> That is to say, if either quotient has a finite limit or tends to $\infty$ or $-\infty$, the other has the same limit.

**Proof from the definition.** 

$$
\frac{\alpha/\beta}{\widetilde\alpha/\widetilde\beta}
=
\frac{\alpha/\widetilde\alpha}{\beta/\widetilde\beta}
\longrightarrow\frac11=1.
$$

Equivalently,

$$
\frac{\alpha}{\beta}
=
\frac{\widetilde\alpha}{\widetilde\beta}
\cdot
\frac{\alpha/\widetilde\alpha}{\beta/\widetilde\beta}.
$$

The second factor tends to $1$, so multiplication by it preserves any finite limit, as well as either infinite limit. Interchanging the original and replacement functions proves the converse. $\square$

We may replace only the numerator or only the denominator by taking the other replacement to be the original function. The same ratio argument also justifies replacing factors in a product. <span style="color: #c62828;">It does <strong>not</strong> justify replacing terms separately in a sum or difference.</span>

>### Example 1. 
>
>Evaluate
>
>$$
>\lim_{x\to0}\frac{\sqrt{1+3x}-1}{\sqrt[3]{1+x}-1}.
>$$

**Solution.** Using $(1+u)^r-1\sim ru$ with $r=1/2$ and $r=1/3$, we get

$$
\sqrt{1+3x}-1\sim\frac32x,\qquad\sqrt[3]{1+x}-1\sim\frac13x.
$$

Hence, by the replacement theorem,

$$
\lim_{x\to0}\frac{\sqrt{1+3x}-1}{\sqrt[3]{1+x}-1}
=\lim_{x\to0}\frac{(3/2)\cdot x}{(1/3)\cdot x}
=\frac92.
$$

>### Example 2. Simplify before using l'Hôpital's rule
>
>Evaluate
>
>$$
>\lim_{x\to0}\frac{\ln\bigl(1+\sin(x-\sin x)\bigr)}{\sqrt{1+x^3}-1}.
>$$

*Hint.* Applying l'Hôpital's rule directly would introduce several chain-rule factors. First remove the outer functions using equivalent infinitesimals.

**Solution.** Since $x-\sin x\to0$,

$$
\ln\bigl(1+\sin(x-\sin x)\bigr)
\sim\sin(x-\sin x)
\sim x-\sin x,
$$

and

$$
\sqrt{1+x^3}-1\sim\frac{x^3}{2}.
$$

Thus the original limit becomes

$$
2\lim_{x\to0}\frac{x-\sin x}{x^3}.
$$

Now apply l'Hôpital's rule to this simpler $0/0$ quotient. The derivative of the denominator is nonzero for $x\ne0$, and the derivative quotient has the limit

$$
\lim_{x\to0}\frac{1-\cos x}{3x^2}
=\lim_{x\to0}\frac{x^2/2}{3x^2}
=\frac16.
$$

Therefore,

$$
\lim_{x\to0}
\frac{\ln\bigl(1+\sin(x-\sin x)\bigr)}{\sqrt{1+x^3}-1}
=2\cdot\frac16=\frac13.
$$

Notice that we preserved the entire difference $x-\sin x$. Replacing $\sin x$ by $x$ inside this difference would erase the term we need to measure.

>### Example 3. Why subtraction requires care
>
>Evaluate
>
>$$
>\lim_{x\to0}\frac{\sin x-\tan x}{x^3}.
>$$

**Solution.** Although $\sin x\sim x$ and $\tan x\sim x$, replacing them separately would give $x-x=0$. This loses the leading behavior of the difference: the common first-order terms cancel.

Instead, use an exact identity first:

$$
\sin x-\tan x
=\sin x\left(1-\frac1{\cos x}\right)
=-\frac{\sin x(1-\cos x)}{\cos x}.
$$

We now have a product and quotient. Using $\sin x\sim x$, $1-\cos x\sim x^2/2$, and $\cos x\to1$, we obtain

$$
\begin{aligned}
\lim_{x\to0}\frac{\sin x-\tan x}{x^3}
&=-\lim_{x\to0}
\left(
\frac{\sin x}{x}
\cdot\frac{1-\cos x}{x^2}
\cdot\frac1{\cos x}
\right)\\[4pt]
&=-1\cdot\frac12\cdot1
=-\frac12.
\end{aligned}
$$

<span style="color: #c62828;">Equivalent factors may be replaced in products and quotients. Terms in a difference cannot, in general, be replaced separately.</span> When leading terms cancel, the previously neglected errors may determine the answer.

>### Example 4. A limit with two tempting mistakes
>
>Evaluate
>
>$$
>\lim_{x\to\infty}\frac{\left(1+\frac1x\right)^{x^2}}{e^x}.
>$$

**Mistake \#1: replacing a convergent base by its limit.**

$$
\lim_{x\to\infty}\frac{\left(1+\frac1x\right)^{x^2}}{e^x}
=\lim_{x\to\infty}\frac{\left(\left(1+\frac1x\right)^x\right)^x}{e^x}
\overset{\textcolor{red}{\text{incorrect}}}{=}\lim_{x\to\infty}\frac{e^x}{e^x}=1.
$$

Although $(1+1/x)^x\to e$, the exponent $x\to\infty$ can amplify the error in the base, so replacing the base by its limit is not justified.

**Mistake \#2: replacing equivalent expressions inside an exponent.**

$$
\lim_{x\to\infty}\frac{\left(1+\frac1x\right)^{x^2}}{e^x}
=\lim_{x\to\infty}\frac{e^{x^2\ln(1+\frac1x)}}{e^x}
\overset{\textcolor{red}{\text{incorrect}}}{=}\lim_{x\to\infty}\frac{e^{x^2\cdot\frac1x}}{e^x}=1.
$$

Although $\ln(1+1/x)\sim1/x$, replacing it in this exponent would require the exponent error $x^2[\ln(1+1/x)-1/x]$ to tend to zero, which it does not. 
<span style="color: #c62828;">Equivalent factors can only be replaced in products and quotients.</span>

**Correct solution.** Combine the exponentials first:

$$
\frac{\left(1+\frac1x\right)^{x^2}}{e^x}
=e^{x^2\ln(1+\frac1x)-x}.
$$


$$
\lim_{x\to\infty}\left(x^2\ln\left(1+\frac1x\right)-x\right)
=\lim_{h\to0^+}\frac{\ln(1+h)-h}{h^2},
\qquad h=\frac1x.
$$

The last quotient has the form $0/0$. Applying l'Hôpital's rule once gives

$$
\lim_{h\to0^+}\frac{\ln(1+h)-h}{h^2}
=\lim_{h\to0^+}\frac{\frac1{1+h}-1}{2h}
=\lim_{h\to0^+}\frac{-1}{2(1+h)}
=-\frac12.
$$

Finally, by continuity of the exponential function,

$$
\lim_{x\to\infty}\frac{\left(1+\frac1x\right)^{x^2}}{e^x}
=e^{\lim\limits_{x\to\infty}\left(x^2\ln(1+\frac1x)-x\right)}
=e^{-1/2}.
$$

## 3. Higher-order infinitesimals as errors

Suppose $\alpha\sim\beta$ as $x\to a$. Then

$$
\frac{\alpha-\beta}{\beta}
=\frac{\alpha}{\beta}-1\longrightarrow0.
$$

Thus, the error $\alpha-\beta$ is a higher-order infinitesimal than $\beta$. Conversely, if $(\alpha-\beta)/\beta\to0$, then $\alpha/\beta\to1$. We have proved

$$
\boxed{
\alpha\sim\beta
\quad\Longleftrightarrow\quad
\alpha=\beta+o(\beta).
}
$$

This expresses an infinitesimal as **a leading term plus an error negligible relative to that leading term**.

For example, as $x\to0$,

$$
\sin x=x+o(x).
$$

The expression $o(x)$ stands for the error function $\sin x-x$, whose ratio to $x$ tends to zero. 

For a fuller discussion of this notation, including its use for functions tending to infinity and for polynomial approximation, see [Landau Symbols: Big O and Little o]({% post_url 2026-09-28-landau-symbols %}).

### Another proof of the replacement theorem

We return to the hypotheses of the theorem in Section 2, replacing the numerator and denominator one at a time.

**Step 1: replace only the numerator.** Since $\alpha\sim\widetilde\alpha$, write

$$
\alpha=\widetilde\alpha+r,
\qquad r=o(\widetilde\alpha).
$$

Keeping $\beta$ unchanged, we obtain

$$
\frac{\alpha}{\beta}
=\frac{\widetilde\alpha}{\beta}+\frac{r}{\beta}
=\frac{\widetilde\alpha}{\beta}
\left(1+\frac{r}{\widetilde\alpha}\right).
$$

Since $r/\widetilde\alpha\to0$, the extra factor tends to $1$. Thus $\alpha/\beta$ and $\widetilde\alpha/\beta$ have the same limit whenever either limit exists, including either infinite limit. For a finite limit, this also says that the additive error $r/\beta$ tends to zero.

**Step 2: replace only the denominator.** Since $\beta\sim\widetilde\beta$, write

$$
\beta=\widetilde\beta+s,
\qquad s=o(\widetilde\beta).
$$

Keeping the numerator $\alpha$ unchanged, we have

$$
\frac{\alpha}{\beta}
=\frac{\alpha}{\widetilde\beta+s}
=\frac{\alpha}{\widetilde\beta}
\cdot\frac1{1+s/\widetilde\beta}.
$$

Because $s/\widetilde\beta\to0$, the final factor is defined sufficiently close to the limit point and tends to $1$. Hence replacing only the denominator also preserves any finite or infinite limit, in either direction.

**Step 3: combine the two replacements.** First apply Step 1. Then apply Step 2 with $\widetilde\alpha$ as the unchanged numerator. This gives

$$
\lim_{x\to a}\frac{\alpha}{\beta}
=\lim_{x\to a}\frac{\widetilde\alpha}{\beta}
=\lim_{x\to a}\frac{\widetilde\alpha}{\widetilde\beta},
$$

whenever any one of these limits exists, including either infinite limit. At each step, a higher-order error changes the quotient by a multiplicative factor tending to $1$. $\square$

---

*Last modified: {{ page.last_modified_at | date: "%B %-d, %Y" }}*
