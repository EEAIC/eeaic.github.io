---
title: Linear discriminant anlaysis
date: 2022-11-13 01:32
categories: [Electronic Engeering, Pattern Recognition]
tags: [Dimensionality reduction, LDA]
math: true
published: true
img_path: "/assets/img/posts/2022-11-13-Linear discriminants analysis"
---

# Linear discriminant analysis, two classes
먼저, 클래스가 두 개인 경우에 한하여 생각합시다.

## Objective
Linear discriminant analysis(LDA)는 클래스의 판별정보를 보존하면서 차원을 감소시키는 방법입니다. 먼저, 클래스 $\omega_1$에 속하는 $N_1$, $\omega_2$에 속하는 $N_2$개의 $D$-차원의 샘플 $\lbrace{x^{(1},x^{(2}, \dots x^{(N}}\rbrace$이 있다고 가정합시다. 이 샘플 $x$를 어떠한 선으로 투영시켜 스칼라 $y$를 얻습니다.

$$y=w^Tx$$

이제 투영된 스칼라 $y$를 쉽게 분리할 수 있도록 투영하는 투영 벡터 $w$를 찾으면 됩니다.

![Figure 1](figure_1.png){: .align-center}
*Figure 1: 빨간색 클래스와 파란색 클래스를 적절한 선에 투영시켜 클래스를 구분*

좋은 투영 벡터를 찾기 위해서는, 스칼라 $y$가 잘 분리되도록 척도를 정의해야 합니다. $x$ 공간과 $y$ 공간에서 각 클래스의 평균 벡터는 아래와 같이 정의할 수 있습니다.

$$\textstyle\mu_i=\frac{1}{N_i}\sum_{x \in w_i}x \space and \space \tilde{\mu}_i=\frac{1}{N_i}\sum_{y \in w_i}y=\frac{1}{N_i}\sum_{x \in w_i}w^Tx=w^T\mu_i$$

LDA에서는 잘 분리하기 위한 목적함수로써 투영된 평균간의 거리를 사용합니다.

$$J(w)=\vert\tilde{\mu}_1-\tilde{\mu}_2\vert=\vert w^T(\mu_1-\mu_2)\vert $$

## Fisher's solution
Fisher는 within-class scatter 척도에 의하여 정규화된 평균간의 차이를 최대화하는 것을 제안하였습니다. 여기서 scatter는 각 클래스에 대한 분산과 유사한 개념입니다.

$$\tilde{s}^2_i=\textstyle\sum_{y \in \omega_i}(y-\tilde{\mu}_i)^2$$

이를 통해, Fisher linear discriminant는 아래와 같이 정의됩니다.

$$J(w)=\frac{\vert\tilde{\mu}_1-\tilde{\mu}_2\vert^2}{\tilde{s}^2_1+\tilde{s}^2_2} $$

이는 같은 클래스끼리는 서로 가까이 투영되게 하되 가능한 투영된 평균은 서로 멀리 투영되도록 하는 $w$를 찾는 것입니다.

![Figure 2](figure_2.png){: .align-center}
*Figure 2: 좌측의 직선에 각 클래스를 투영*

## Find the optimum
먼저, $x$ 공간에서의 scatter를 계산합니다.

$$S_i^2=\textstyle\sum_{x \in \omega_i}(x-\mu_i)(x-\mu_i)^T \\
S_1^2+S_2^2=S_W$$

> $S_W$는 within-class scatter라고 불립니다.

투영된 y 공간에서의 scatter를 특징 공간 x의 scatter 행렬의 형태로 표현합니다.

$$\begin{align*}
\tilde{s}^2_i&=\textstyle\sum_{y \in \omega_i}(y-\tilde{\mu}_i)^2 = \sum_{x \in \omega_i}(w^Tx-w^T\mu_i)^2 \\ &=\textstyle\sum_{x \in \omega_i}w^T(x-\mu_i)(x-\mu_i)^Tw=w^TS^2_iw
\end{align*} $$

$$\boxed{\tilde{s}^2_1+\tilde{s}^2_2=w^TS_Ww}$$

이와 동일하게, 투영된 평균 간의 차이 또한 투영되기 전의 특징 공간에서의 평균으로 표현할 수 있습니다.

$$(\tilde{\mu}_1-\tilde{\mu}_2)^2=(w^T\mu_1-w^T\mu_2)^2 = w^T(\mu_1-\mu_2)(\mu_1-\mu_2)^Tw=\boxed{w^TS_Bw}$$

> $S_B$는 between-class scatter라고 불립니다. $S_B$는 두 벡터의 외적이며, 이것의 랭크는 최대 1이라는 점에 주목하세요.

최종적으로, $S_W$와 $S_B$으로 Fisher criterion을 표현할 수 있습니다.

$$J(w)=\frac{w^TS_Bw}{w^TS_Ww} $$

$J(w)$의 최대값을 찾기 위해 미분하고 0이 되는 지점을 계산합니다.

$$\begin{aligned}
\frac{d}{dw}[J(w)] = \frac{d}{dw}\Bigg\lbrack\frac{w^TS_Bw}{w^TS_Ww}\Bigg\rbrack &= 0 \Rightarrow \\
\lbrack w^TS_Ww\rbrack \frac{d[w^TS_Bw]}{dw}-\lbrack w^TS_Bw\rbrack \frac{d[w^TS_Ww]}{dw} &=0 \Rightarrow \\
\lbrack w^TS_Ww\rbrack 2S_Bw-\lbrack w^TS_Bw\rbrack 2S_Ww &=0
\end{aligned}$$

$w^TS_Ww$로 나눕니다.

$$\begin{aligned}
\Bigg\lbrack\frac{w^TS_Ww}{w^TS_Ww}\Bigg\rbrack S_Bw-\Bigg\lbrack\frac{w^TS_Bw}{w^TS_Ww}\Bigg\rbrack S_Ww& =0 \Rightarrow \\
S_Bw-JS_Ww &=0 \Rightarrow \\
S^{-1}_WS_Bw-Jw& =0
\end{aligned}$$

최종적으로는 고유값을 구하는 문제($S^{-1}_WS_Bw=Jw$)와 동일하게 됩니다.

$$\boxed{w^*=\arg \max \Bigg\lbrack\frac{w^TS_Bw}{w^TS_Ww}\Bigg\rbrack=S^{-1}_W(\mu_1-\mu_2)}$$

정확히는 판별식은 아니고, 투영 벡터를 찾는 방법이지만 이것은 <u>Fisher's linear discriminant</u>(1936)로 알려져 있습니다. 

# Linear discriminant analysis, C classes
이제, C개 클래스를 분류하는 문제로 확장시켜 봅시다. 기존에서는 하나의 투영으로 두 개의 클래스를 분류했다면, 이제는 $(C-1)$개의 투영으로 C개의 클래스를 분류할 수 있습니다. 투영 벡터 $w_i$는 이제 투영 행렬 $W=[w_1|w_2|\dots|w_{C-1}]$로 확장됩니다.

$$y_i=w^T_ix \Rightarrow y = W^Tx$$

![Figure 3](figure_3.png)
*Figure 3: 각 분포의 평균과 scatter*

## Derivation
within-class scatter는 아래처럼 일반화 될 수 있습니다.

$$S_W=\textstyle\sum^C_{i=1}S_i^2$$

> 이때 $S_i^2=\sum_{x \in \omega_i}(x-\mu_i)(x-\mu_i)^T$이고 $\mu_i=\frac{1}{N_i}\sum_{x \in \omega_i} x$입니다.

그리고 between-class scatter는 아래처럼 됩니다.

$$S_B=\textstyle\sum^C_{i=1}N_i\lparen\mu_i-\mu\rparen\lparen\mu_i-\mu\rparen^T$$

> 이때 $\mu=\frac{1}{N}\sum_{\forall x}x=\frac{1}{N}\sum^C_{i=1}N_i\mu_i$입니다.

행렬 $S_T=S_B+S_W$는 <u>total scatter</u>라고 불립니다. 유사하게, 투영된 샘플에 대해 평균 벡터와 scatter 행렬을 구합니다.

$$\begin{aligned}
\tilde{\mu}_i&=\frac{1}{N_i}\textstyle\sum_{y \in \omega_i} y
&\tilde{S}_W &=\textstyle\sum^C_{i=1}\sum_{y \in \omega_i}(y-\tilde{\mu}_i)(y-\tilde{\mu}_i)^T \\
\tilde{\mu} &=\frac{1}{N}\textstyle\sum_{\forall y} y 
&\tilde{S}_B &=\textstyle\sum^C_{i=1}N_i(\tilde{\mu}_i-\tilde{\mu})(\tilde{\mu}_i-\tilde{\mu})^T \\
\end{aligned}
$$

클래스가 두 개인 경우에서의 미분과 마찬가지로, 아래와 같이 표현할 수 있습니다.

$$\begin{aligned}
\tilde{S}_W&=W^TS_WW \\
\tilde{S}_B&=W^TS_BW
\end{aligned}$$

최종적인 목적함수는 분모와 분자에 판별식이 추가된 형태입니다.

$$
J(W)=\frac{|\tilde{S}_B|}{|\tilde{S}_W|}=\frac{|W^TS_BW|}{|W^TS_WW|}
$$

여기서 판별식이 추가된 이유는 계산된 scatter 행렬을 스칼라 값으로 바꾸기 위해서입니다. 최종적으로 최적의 $W$는 아래와 같습니다.

$$\boxed{W^*=[w^*_1|w^*_2|\dots w^*_{C-1}] = \arg \max \frac{|W^TS_BW|}{|W^TS_WW|} \Rightarrow(S_B-\lambda_iS_W)w^*_i=0}$$

$S_B$는 랭크가 $\le 1$인 $C$ 행렬들의 합이고 평균 벡터들은 $\frac{1}{C}\sum^C_{i=1}\mu_i=\mu$을 만족합니다. 그러므로 $S_B$의 랭크는 $C-1$보다 같거나 작습니다. 이는 0이 아닌 $C-1$개의 고유값을 얻을 수 있다는 것을 의미합니다. 클래스 분리성이 최대인 투영은 $S^{-1}_WS_B$의 가장 큰 고유값과 대응되는 고유 벡터입니다.

# LDA vs. PCA

![Figure 4](figure_4.png)
*Figure 4: 가스 센서 데이터의 PCA와 LDA*

5 종류의 커피 냄새 분류를 위해 가스 센서로부터 데이터를 수집하여 처리한 예시입니다. PCA의 경우, 전반적으로 데이터가 넓게 분포하고 있지만 LDA는 특징을 잘 판별하도록 데이터가 분포하고 있습니다.

# Limitations of LDA
## LDA produces at most C-1 feature projections
분류를 위해서 더 많은 특징이 필요하다면, 추가적인 특징을 제공하기 위해서는 다른 방법을 사용해야 합니다.

## LDA is a parametric method
분포가 unimodal 가우시안 분포를 따른다면 LDA를 사용했을 때 좋은 성능을 기대할 수 있습니다. 하지만, 이외의 형태는 잘 분류하지 못합니다.

![Figure 5](figure_5.png)
*Figure 5: LDA로 구분하기 어려운 분포*

## LDA will also fail if discriminatory information is not in the mean but in the variance of the data
분포간의 평균의 차이가 적을 경우, LDA를 사용하면 잘 분류되지 않습니다.

![Figure 6](figure_6.png)
*Figure 6: PCA가 변별에 유리한 분포*

# Variants of LDA
## Non-parametric LDA
국부적인 정보와 kNN을 사용하여 $S_B$을 계산함으로써 unimodal 가우시안 추정을 하는 비모수적 LDA입니다. 즉, 클래스 안에서 클러스터를 구성하고 클러스터간 LDA를 수행한다고 볼 수 있습니다. 이 결과, 행렬 $S_B$는 full-rank이며 $(C-1)$개 이상의 특징을 추출할 수 있습니다. 이러한 방식은 데이터의 구조를 더 잘 보존할 수 있습니다.

## Orthonormal LDA
OLDA는 Fisher criterion을 최대화하고 동시에 pair-wise 직교 정규 분포를 따르는 투영을 계산합니다. OLDA에서 사용되는 이 방법은 $S^{-1}_WS_B$의 고유값 문제와 그람-슈미트 직교화 과정의 결합으로 볼 수 있습니다. OLDA는 순차적으로 추출된 모든 특징에 직교하는 부분공간에서 Fisher criterion을 최대화하는 축을 찾습니다. OLDA는 $(C-1)$개 이상의 특징을 찾을 수 있습니다.

## Generalized LDA
GLDA는 베이즈 리스크를 계산하는 데 사용된 것과 유사한 비용 함수를 활용하여 Fisher criterion을 일반화합니다. 비용이 높을 경우에는 높은 차원에 투영하고 비용이 낮으면 낮은 차원에 투영합니다.

## Multilayer perceptrons
다층 퍼셉트론은 마지막 은닉층의 결과인 scatter 행렬 $Tr[S_BS^\dagger_T]$를 최대화하여 LDA를 수행할 수 있습니다. 

# Other dimensionality reduction methods
## Exploratory Projection Pursuit
"관심"을 척도로 하여 이를 최대화하도록 $M$-차원(주로, $M=2,3$)으로 선형 투영하는 방법입니다. "관심"이란 다변량 정규성으로부터 떨어진 정도를 의미합니다. 이 척도는 분산을 의미하는 것은 아닙니다. 그리고 보통 scale-free 합니다. 대부분의 구현에서 affine invariant하므로 특징 간의 상관관계에 의존하지 않습니다. 다른 말로는, EPP는 가능한 많이 분리하고 각 클러스터 안에서는 최대한 밀착되도록 하는 투영을 찾는 것입니다. Fisher의 방법과 유사하지만, EPP는 클래스 라벨을 사용하지 않습니다. 일단 관심있는 투영이 발견되면, 다른 관심있는 관점을 더 쉽게 찾기 위해 그 구조를 제거합니다.

![Figure 7](figure_7.png)
*Figure 7: EPP의 적용*

## Sammon's non-linear mapping
이 방법은 점간의 거리는 최대한 보존하며 $N$-차원의 공간을 $M$-차원의 공간으로 맵핑하는 것입니다. 이는 아래의 목적함수를 최소화하는 것으로 달성할 수 있습니다.

$$
E(d, d')=\textstyle\sum_{i \neq j}\frac{[d(P_i, P_j)-d(P'_i, P'_j)]^2}{d(P_i, P_j)}
$$

초기에는 명시적인 맵핑을 얻을 수는 없었고 훈련 세트에서 룩업 테이블을 구현하는 것에 지나지 않았습니다만, 신경망에 기반한 구현을 통해 테스트 데이터에 대해 명시적인 맵핑을 얻을 수 있게 됐었습니다. 또한, 비용 함수를 고려할 수 있게 되었습니다.

새몬 맵핑은 사회 과학에서 주로 사용되는 다변량 통계 방법 중 Multi Dimensional Scaling(MDS)와 매우 관련되어 있습니다.

# Reference

1. 홍광석, "패턴인식론(ECE5302)" (대학강의, 성균관대학교, 2022년 가을학기)