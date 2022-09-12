---
title: "Introduction to pattern recognition"
date: 2022-09-1 1:23
categories: [Electronic Engeering, Pattern Recognition]
tags: [TAG]     # TAG names should always be lowercase
math: true
published: false
img_path: "/assets/img/posts/2022-09-01-Introduction to pattern recognition"
---

# What is pattern recognition?

패턴 인식이란 무엇일까요?
패턴 인식에 대해선 여러 정의가 있습니다.

## Definitions from the literature

- “The assignment of a physical object or event to one of several prespecified categories” - *Duda and Hart*
- “A problem of estimating density functions in a high-dimensional space and dividing the space into the regions of categories or classes” - *Fukunaga*
    - 확률 밀도 함수 추정을 통해 공간을 나누는 것
- “The science that concerns the description or classification of measurements” - *Schalkoff*
    - 측정된 데이터에 대한 기술(Description) 혹은 분류
- “The process of giving names $w$ to observations $x$” - *Schürmann*
- Pattern recognition is concerned with answering the question “**What is this?**” - *Morse*

다양한 정의가 있지만, 가장 중요한 점이 “이것이 무엇이냐?”에 대해 답하는 것이라 말할 수 있겠습니다.

# Examples of pattern recongition problems

패턴 인식은 다양한 분야에서 사용되고 있습니다.

## Machine vision

- 자동화된 도구 인식
- 타겟 검출

## Character recognition

- 자동화된 메일 분류
- 이미지를 문자로 변환

## Computer aided diagnosis

- 의료 영상, EEG, ECG 신호 분석
- 의사들을 돕기 위한 방향으로 주로 설계

## Speech recognition

- Human Computer Interaction
- 음성 신호를 음소(Phonemes)와 단어(Words)로 분류

# Types of prediction problems

패턴 인식에는 크게 4가지의 유형이 있습니다.

## Classification

- 객체를 클래서에 할당하는 패턴 인식(Pattern Recognition) 문제입니다.
- 출력은 정수형 라벨입니다.

## Regression

- Classification의 일반화로 볼 수 있습니다.
- 출력은 실수값(real-valued number)입니다.

## Clustering

- 객체를 의미있는 그룹을 조직화 하는 문제입니다.
- 패턴 인식 시스템은 (때때로 계층적인) 개체의 그룹화 내용을 출력합니다.

## Description

- 객체의 내용을 서술 및 기술하는 문제입니다.
- 패턴 인식 시스템은 구조적 또는 언어학적인 기술을 할 수 있습니다.

# Features and Patterns

## Feature

특징은 어떠한 구분되는 점, 퀄리티, 특성 등을 의미합니다. 이러한 점에서 색상과 같이 특정 심볼이거나 키와 같이 숫자가 될 수 있습니다.

### Definitions

- $d$개의 특징의 조합은 $d$-차원 열 벡터로 표현되며 특징 벡터(Feature vector)로 불립니다.
- 특징 벡터에 의해 정의된 $d$-차원 공간은 특징 공간(Feature space)으로 불립니다.
- 각 요소들은 특징 공간에서 점으로 표현되며 주로, scatter plot을 통해 시각화됩니다.

![feature.png](feature.png)

## Pattern

- 패턴은 각 요소의 모양(Traits)이나 특유의 특징(Feature characteristic)들로 구성됩니다.
- 분류 문제에서, 패턴은  한 쌍의 변수 $\{x, w\}$로 표현됩니다.
    - $x$는 관찰된 것(Observation) 또는 특징의 모음(Collection)입니다. → 특징 벡터
    - $w$는 관찰된 내용의 이면에 있는 개념입니다. → 라벨(Label)

## What makes a “good” feature vector

어떻게 하면 좋은 특징 벡터를 만들 수 있을까요? 특징 벡터의 퀄리티는 서로 다른 클래스를 얼마나 잘 분류하는지와 관련이 있습니다. 아래 그림을 통해 그 특성들을 파악할 수 있습니다.

![more feature properties.png](more_feature_properties.png)

# Classifiers

## Task of a classifier

분류기의 목적은 특징 공간을 class-labeled 결정 영역으로 나누는 것입니다. 두 결정 영역 사이의 경계는 결정 경계라고 부릅니다. 특징 벡터 $x$의 분류는 그것이 어느 영역에 속해 있는지를 결정하고 $x$를 해당 영역으로 할당하는 것으로 구성되어 있습니다.

## Representation of a classifer

분류기는 판별 함수(Discriminant function)의 집합으로 표현됩니다. 기본적으로 n개의 클래스를 분류하면 n개의 판별 함수가 필요합니다. 만약, $g_i(x)>g_j(x)\enspace \forall j \neq i$이라면 분류기는 특징 벡터 $x$를 클래스 $w_i$에 할당할 것입니다.

# Pattern recognition approaches

패턴 인식론에서의 접근 방법은 크게 3가지로 볼 수 있습니다.

## Statistical

통계적 접근은 특징의 근본적인(Underlying) 통계 모델에 기반한 패턴 분류 모델입니다.
통계적 모델은 class-conditional 확률 밀도 함수 $p(x|w_i)$의 모임으로 정의될 수 있습니다.

## Neural

신경망은 어떠한 입력이 들어오면, 해당 입력에 대해 처리 유닛들로 이루어진 네트워크의 반응에 기반하여 분류합니다. 학습이 가능하고, 특정 알고리즘을 사용하지 않으며, 내부를 알 수 없는 블랙 바스 전략이라는 특징을 가지고 있습니다. 현재, 매우 매력적인 접근이라고 볼 수 있습니다. 

## Syntactic(구조적)

구조적 유사성 측정에 기반판 패턴 분류 방식입니다. **지식**은 형식적인 문법이나 관계적 설명을 통해 표현될 수 있습니다. 이러한 접근은 더 단순한 서브 패턴으로부터 복잡한 패턴에 대한 계층적으로 설명할 수 있습니다. 이 때문에, 분류 뿐만 아니라 기술(Description)에 더 자주 사용됩니다.

# Pattern recognition design cycle

패턴 인식은 크게 5가지로 정도로 구성되어 있습니다.

## Data collection

패턴 인식에 가장 시간이 많이 걸리는 부분입니다. 데이터를 얼마나 수집해야 할 지 고민하고 수집하는 단계입니다.

## Feature choice

패턴 인식의 성공에 큰 영향을 미치는 단계입니다. 데이터에 대한 선행 지식이 필요합니다.

## Model choice

인식 모델을 선정하는 단계 입니다. 통계적, 신경망, 구조적 접근 중 적합 모델을 선정합니다. 또한, 적절하게 매개 변수를 세팅 합니다.

## Training

아직 학습되지 않은 모델을 데이터를 통해 훈련시키는 단계입니다. 지도, 비지도, 강화학습 등을 통해 훈련시킬 수 있습니다.

## Evaluation

최종적으로 얼마나 학습이 잘 되었는지 평가하는 단계입니다. 과적합 문제가 발생하는 지, 일반화가 잘 되었는 지 판단합니다.

# Reference

1. 홍광석, “패턴인식론(ECE5302)” (대학강의, 성균관대학교, 2022년 9월 2일)