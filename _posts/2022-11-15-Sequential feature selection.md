---
title: Sequential feature selection
date: 2022-11-15 04:22
categories: [Electronic Engeering, Pattern Recognition]
tags: [Dimensionality reduction]
math: true
published: true
img_path: "/assets/img/posts/2022-11-15-Sequential feature selection"
---

# Feature subset selection(FSS)
## Definition
특징 집합 $X=\lbrace x_i|i=1\dots N\rbrace$가 주어졌을 때, 이상적으로 $P(correct)$인 목적함수 $J(Y)$를 최대화하는 $M \lt N$인 부분집합 $Y_M$을 찾는 것

## Necessary
1. 특징을 얻기가 비싼 경우입니다. 테스트 환경에서는 많은 센서를 사용할 수 있지만, 실제 제품에는 많은 센서를 사용하지 못하는 경우가 많습니다.

1. 분류기로부터 어떠한 의미있는 법칙을 찾을 경우입니다. 특징을 투영하게 되면, 측정된 특징의 정보가 사라지는 단점이 있습니다.

1. 특징이 숫자가 아닐 수 있습니다. 

1. 더 적은 특징을 사용하면 모델의 파라미터 수를 줄일 수 있습니다. 이는 일반화 능력을 향상시킬 수 있고 모델의 복잡도를 감소시킵니다.

FSS는 여러 가능한 특징 집합에서 선택하기 위한 탐색 전략이 필요합니다. 또한, 선택된 집합을 평가하기 위한 목적 함수가 필요합니다. 

# Search strategy
특징 집합에 대해 전부 평가하려면 고정된 $M$에 대해 ${N \choose M}$ 조합을 평가해야 하며, 만약 최적의 $M$이 있다고 하면 $2^N$의 조합을 평가해야 합니다. 이 조합의 수는 실행불가능합니다. 예를 들어 20개의 특징 중 10개를 전부 평가하려면 184,756개의 특징 집합을 평가해야 합니다. 100개 중 10개를 전부 평가하려면 $10^{13}$개의 특징 집합을 평가해야 합니다. 그러므로 탐색 전략을 통해 모든 가능한 특징 조합의 공간에서 FSS 과정에 대한 전략를 세워 탐색해야 합니다.

# Objective function
목적 함수를 통해 후보 집합이 얼마나 좋은지에 대해 평가합니다. 이 평가를 활용하여 탐색 전략에 맞춰 새로운 후보 집합을 선택할지 결정합니다.

## Objective functions are divided in two groups
- Filters: 클래스간의 거리, 통계쩍 의존성 또는 정보-이론적 척도등의 정보 콘텐츠를 활용하여 특징 집합을 평가합니다. 
- Wrappers: 분류기를 사용하여 통계적 리셈플링 또는 교차 검증을 통한 테스트 데이터에 대한 예측 정확도를 활용하여 부분집합을 평가합니다.

![Figure 1](figure_1.png)
*Figure 1: Filter와 wrapper의 FSS*

# Filter types
## Distance or separability measures
이 방법은 아래와 같은 지표를 사용하여 클래스 분리가능성을 측정합니다.
- 클래스간의 거리: 유클리디안, 마할라노비스 등
- $S^{-1}_WS_B$의 판별식(LDA 고유값들)

## Correlation and information-theoretic measures
이 방법은 좋은 특징 집합이 클래스와 높은 상관관계지며 서로 간에는 상관관계가 없다는 가진다는 이론적 근거를 기반으로 합니다. 

### Linear relation measures
변수간의 선형 관계는 상관계수를 사용하여 측정될 수 있습니다.

$$
J(Y_M)=\frac{\sum^M_{i=1}\rho_{ic}}{\sum^M_{i=1}\sum^M_{j=i+1}\rho_{ij}}
$$

$\rho_{ic}$는 특징 $i$와 클래스간의 상관계수이며 $\rho_{ij}$는 특징 $i$와 $j$의 상관계수를 의미합니다.

### Non-linear relation measures
상관관계는 선형 의존성에 대해서만 측정이 가능합니다. 더 강력한 척도는 상호의존정보 $I(Y_k;C)$입니다.

$$
J(Y_M)=I(Y_M;C)=H(C)-H(C|Y_M)=\sum^C_{c=1}\int_{Y_M}p(Y_m, \omega_c)\log\frac{p(Y_m,\omega_c)}{p(Y_M)P(\omega_c)}dx
$$

특징 벡터와 클래스 레이블 사이의 상호의존정보 $I(Y_M;C)$는 특징 벡터 $H(C\vert Y_M)$를 통해 클래스의 불확실성([entropy](https://en.wikipedia.org/wiki/Entropy#Information_theory))이 감소하는 양에 대한 척도입니다. 여기서 $H(\sdot)$는 엔트로피 함수입니다. 상호의존정보는 다변량 밀도함수 $p(Y_M)$과 $p(Y_M, \omega_c)$의 계산이 필요합니다. 이것은 높은 차원 공간 때문에 계산하기 어렵습니다. 실제로는, 상호의존정보는 아래 식과 같이 휴리스틱하게 바꿔 사용합니다.

$$
J(Y_M)=\sum^M_{m=1} I(x_{i_m};C)-\beta\sum^M_{m=1}\sum^M_{n=m+1} I(x_{i_m};x_{i_n})
$$

# Filter vs. Wrappers
## Filters
빠른 실행 속도(+)
: 일반적으로 반복적이지 않은 계산을 하며 이는 wrapper보다 훨씬 빠릅니다.

일반성(+)
: 특정한 분류기에 기반하지 않으므로, 여러 형태의 분류기를 사용할 수 있습니다.

큰 부분집합을 선택하려는 경향성(-)
: 목적함수가 단조함수이기 때문에 필터는 전체 특징 집합을 선택하려는 경향을 보입니다. 이에 따라 임의의 특징 개수를 지정하여야 합니다.

## Wrappers
정확성(+)
: Wrapper는 filter보다 일잔적으로 저 좋은 인식률을 보여줍니다. 왜냐하면 wrapper는 분류기와 데이터 세트간의 특정한 상호 작용에 의해 맞추어져 있기 때문입니다.

일반화하기 위한 능력(+)
: 일반적으로 예측 정확도에 대해 교차 검증을 사용하기 때문에 wrapper는 과적합을 피라기 위한 메커니즘이 있습니다.

느린 실행 속도(-)
: Wrapper는 각 특징 집합마다 분류기를 학습시켜야하므로 계산을 많이 요구하며 이는 실행하기 어려울 수 있습니다.

일반성의 부족(-)
: 평가에 사용된 분류기에 편향되어 있기 때문에 이 방법은 일반성이 부족하다. 최적의 특징 집합은 고려중인 분류기에 특정될 것입니다.

# Naïve sequential feature selection
간단히 각각의 특징을 개별적으로 평가하고 잘하는 순서대로 $M$개를 선택하는 나이브한 방법을 고려해 봅시다. 불행히도, 이 방법은 잘 동작하지 않습니다. 왜냐하면, 특징간의 의존관계를 고려하지 않았기 때문입니다. 아래의 예시를 통해 확인하여 봅시다.

## Example

![Figure 2](figure_2.png)
*Figure 2: 왼쪽: $X_1, X_2$에서의 각 클래스 분포, 오른쪽: $X_3, X_4$에서의 각 클래스 분포*

위의 Figure 2는 4차원에서의 5가지 클래스를 분류하는 문제를 보여 줍니다. 합리적인 목적 함수는 좋은 특징의 정도를 $J(x_1) \gt J(x_2) \approx J(x_3) \gt J(x_4)$의 순서대로 순위를 매길 것 입니다.
- $x_1$은 가장 좋은 특징: $\omega_1, \omega_2, \omega_3$와 $\lbrace\omega_4, \omega_5\rbrace$를 구분할 수 있습니다.
- $x_2$와 $x_3$는 동일: 클래스를 3개의 그룹으로 분리할 수 있습니다.
- $x_4$는 가장 나쁜 특징: $\omega_4$와 $\omega_5$ 밖에 구분할 수 없습니다.

최적의 특징 집합은 $\lbrace x_1,x_4\rbrace$로 볼 수 있습니다. 왜냐하면 $x_4$는 단지 $x_1$이 필요로 하는 정보인 클래스 $\omega_4$와 $\omega_5$를 구별하는 정보를 제공하기 때문입니다. 만약, 개별적인 점수 $J(x_k)$에 대해서만 특징을 고른다면, 확실히 $x_1$과 $x_2$ 또는 $x_3$ 중 하나를 선택할 것입니다. 하지만, 이는 $\omega_4$와 $\omega_5$를 구별할 수 없습니다. 따라서, 이러한 나이브한 전략은 실패합니다. 왜냐하면, 특징간의 상호보완적인 정보에 대해 고려하지 않았기 때문입니다.

# Sequential forward selection(SFS)
SFS는 가장 간단한 그리디 탐색 알고리즘입니다. 공집합에서부터 시작하며 $J(Y_k+x^+)$를 최대화하도록 연속적으로 특징 $x^+$를 추가합니다.

|알고리즘|탐색 과정|
:-------------------------:|:-------------------------:
![Figure 3](figure_3.png)*Figure 3: SFS 알고리즘*|![Figure 4](figure_4.png)*Figure 4: SFS 탐색 과정*

SFS는 최적의 특징 집합이 작을수록 유리합니다. 전체 특징 집합에 가까워질수록 SFS에 의하여 탐색되어야 되는 지역은 더 좁아집니다. 왜냐하면 대부분의 특징이 이미 선택되었기 때문입니다. 검색 공간이 계란형인 이유는 전제 특징집합 혹은 공집합쪽으로 갈수록 더 적은 상태가 있기 때문입니다. SFS의 주된 단점은 추가된 이전의 특징을 제거할 수 없는 단점이 있습니다.



# Sequential backward selection(SBS)
SBS는 SFS의 역방향 구현입니다. 전체 특징 집합에서부터 시작하며, 목적함수 $J(Y-x^-)$의 값의 감소가 최소가 되도록 특징 $x^-$를 연속적으로 제거합니다. 특징을 제거하는 것이 목적함수의 값을 증가시킬수도 있습니다. 이러한 점 때문에 목적 함수는 비단조적(non-monotonic)일 수 있습니다.

|알고리즘   |탐색 과정   |
:-------------------------:|:-------------------------:
![Figure 5](figure_5.png)*Figure 5: SBS 알고리즘*|![Figure 6](figure_6.png)*Figure 6: SBS 탐색 과정*

SBS는 최적의 특징 집합이 클수록 유리합니다. 이 방법의 한계는 버린 특징을 다시 추가할 수 없다는 점입니다.

# Plus-L minus-R selection(LRS)
LRS는 SFS와 SBS의 일반화된 구현입니다. 
- 만약, $L\gt R$이라면 LRS는 공집합에서 시작하고 $L$번 반복하여 특징을 추가하고 $R$번 특징을 제거합니다.
- 만약, $L\lt R$이라면 LRS는 전체 특징 집합에서 시작하고 $R$번 반복하여 특징을 제거하고 $L$번 특징을 추가합니다.

LRS는 SFS와 SBS가 선택을 되돌릴 수 없는 약점을 보완하기 위한 방법입니다. 이 방법의 한계는 최적의 $L$과 $R$을 예측하는 것이 어렵다는 것입니다.


|알고리즘   |탐색 과정   |
:-------------------------:|:-------------------------:
![Figure 7](figure_7.png)*Figure 7: LRS 알고리즘*|![Figure 8](figure_8.png)*Figure 8: LRS 탐색 과정*

# Bidirectional Search(BDS)
BDS는 SFS와 SBS의 병렬화된 구현입니다. SFS는 공집합에서부터 시작하고, SBS는 전체 특징 집합에서부터 시작합니다. SFS와 SBS가 같은 solution에 수렴되도록 보장되어야 합니다. 이는 아래 두가지 조건을 지키면 보장할 수 있습니다.
- SFS에 의해 선택된 특징은 SBS에 의해 제거되어서는 안됩니다.
- SBS에 의해 제거된 특징은 SFS에 의해 선택되어서는 안됩니다.

|알고리즘   |탐색 과정   |
:-------------------------:|:-------------------------:
![Figure 9](figure_9.png)*Figure 9: BDS 알고리즘* |  ![Figure 10](figure_10.png)*Figure 10: BDS 탐색 과정*

# Sequential floating selection(SFFS and SFBS)
LRS의 백트래킹 능력을 좀 더 확장한 방법입니다. $L$과 $R$을 고정시키지 않고, 데이터를 통해 결정하도록 합니다. 부분집합의 차원이 검색 중에 유동적으로 증가 및 감소합니다.

## There are two floating methods
Sequential floating forward selection(SFFS)는 공집합으로부터 시작합니다. 특징을 추가하는 단계 이후, SFFS는 가능한 목적 함수가 증가하는 한 특징을 제거하는 단계를 수행합니다. Sequeuntial floating backward selection(SFBS)는 전체 특징 집합에서 시작합니다. 특징을 제거하는 단계 이후, SFBS는 가능한 목적 함수가 증가하는 한 특징을 추가하는 단계를 수행합니다.

|알고리즘   |탐색 과정   |
:-------------------------:|:-------------------------:
![Figure 11](figure_11.png)*Figure 11: SFFS 알고리즘* | ![Figure 12](figure_12.png)*Figure 12: SFFS와 SFBS 탐색 과정*

> 제거된 특징은 기록하며 처리해야 무한 루프를 피할 수 있습니다.

# Reference

1. 홍광석, "패턴인식론(ECE5302)" (대학강의, 성균관대학교, 2022년 가을학기)