---
title: Regression Technique
date: 2022-09-10 12:42
categories: [Electronic Engeering, Pattern Recognition]
tags: [TAG]     # TAG names should always be lowercase
math: true
published: false
---

# Supposition

- 한 쌍의 데이터가 주어졌다고 가정합시다.
- 그 데이터 간에는 어떠한 관계가 있습니다.

# Objective

- 우리의 목적은 주어진 측정된 데이터 ${\\{(x_i,y_i), i=1,2,\dots,n\\}}$에서 각 데이터 간의 관계와 잘 대응되는 직선을 찾아야 합니다.
- 이러한 직선은 $y = \alpha x+\beta$로 표현할 수 있습니다.

# Criterion

- 제곱 오차를 최소화(Minimum squared error)하여 데이터에 가장 잘 맞는 직선에 대한 상수 $\alpha$와 $\beta$를 고르세요.

$$
(\alpha_o,\beta_o)=\argmin_{(\alpha,\beta)}\varepsilon
$$

- $o$는 optimum의 표현이고, $\varepsilon$는 아래 표현된 평균 제곱 오차입니다.

$$
\varepsilon=\frac{1}{n-1}\sum_{i=1}^n(y_i-\alpha x_i-\beta)^2
$$

- $\frac{1}{n}$이 아닌 이유는 값이 편향되지 않도록(Unbias) 하기 위함입니다.

# Procedure

- 우리는 $\varepsilon$의 미분을 통해 값이 0되는 지점을 찾아 가장 최소값을 찾을 수 있습니다.

$$
\frac{\partial\varepsilon}{\partial\alpha}=-\frac{2}{n-1}\sum_{i=1}^n(y_i-\alpha_ox_i-\beta_o)x_i=0  \\
\frac{\partial\varepsilon}{\partial\beta}=-\frac{2}{n-1}\sum_{i=1}^n(y_i-\alpha_ox_i-\beta_o)=0
$$

- 위 식을 크레마 공식 등을 통해 정리하면 아래와 같습니다.

$$
(\sum_{i=1}^nx_i^2)\alpha_0+(\sum_{i=1}^nx_i)\beta_0=\sum_{i=1}^nx_iy_i \\
(\sum_{i=1}^nx_i)\alpha_0+n\beta_0=\sum_{i=1}^ny_i \\

$$

- $(\alpha_0,\beta_0)$에 대해 항을 정리하면 아래와 같습니다.

$$
\alpha_0=\frac{n\sum_{i=1}^nx_iy_i-\sum_{i=1}^nx_i\sum_{i=1}^ny_i}{n(n-1)s_x^2} \\
\beta_o=\bar{y}-\alpha_0\bar{x}
$$

- $\bar x$는 표본에서 $x$의 평균, $\bar y$는 표본에서 $y$의 평균, $s_x^2$은 표본의 분산을 의미합니다.
- 더 간단히 표현하기 위해서, 표본 공분산 $c_{xy}$와 표본 상관계수 $r_{xy}$를 아래와 같이 정의합니다.

$$
c_{xy}=\frac{1}{n-1}\sum_{i=1}^n(x_i-\bar x)(y_i-\bar y) \\
r_{xy}=\frac{c_{xy}}{s_xs_y}
$$

- $c_{xy}$을 전개하여 아래와 같이 표현합니다.

$$
c_{xy}=\frac{n\sum_{i=1}^nx_iy_i-\sum_{i=1}^nx_i\sum_{i=1}^ny_i}{n(n-1)}
$$

- 그러면 상수 $\alpha_0$는 아래와 같이 간단히 표현할 수 있습니다.

$$
\alpha_0=\frac{c_{xy}}{s_x^2}
$$

⇒ 정리하면, 데이터에 가장 잘 맞는 회귀식은 아래의 식으로 표현됩니다.

$$
y=\alpha_0x+\beta_0=\frac{c_{xy}}{s_x^2}+\bar y-\frac{c_{xy}}{s_x^2}\bar x
$$

⇒ 이를 조금 더 정리하면, 최종적으로 아래와 같이 정리 가능합니다.

$$
y-\bar y=\frac{c_{xy}}{s_x^2}(x-\bar x)
$$

⇒ 또는, 아래와 같이 표현할 수도 있습니다.

$$
\frac{y-\bar y}{s_y}=r_{xy}\frac{x-\bar x}{s_x}
$$

# Remarks

1. 만약, $r_{xy}=0$이라면, 그 데이터셋에는 아무런 상관관계가 없습니다(Uncorrelated).
2. 만약, $r_{xy}=\pm1$이라면, 그 데이터셋은 선형 관계(Linearly related)를 따릅니다.
3. 데이터에 식이 잘 맞는지는 제곱 오차 $\varepsilon$ 를 통해 판단할 수 있습니다. 비록 이 값이 잘 최소화되었더라도 상관계수가 작다면 해당 식은 데이터에 잘 맞지 않다고 볼 수 있습니다.

# Reference

1. 홍광석, “패턴인식론(ECE5302)” (대학강의, 성균관대학교, 2022년 9월 2일)