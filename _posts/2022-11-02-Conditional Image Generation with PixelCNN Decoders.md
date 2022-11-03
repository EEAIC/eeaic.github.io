---
title: Conditional Image Generation with PixelCNN Decoders
date: 2022-11-02 16:59
category: [Paper Review]
tags: [paper review, NeurIPS]
math: true
published: false
img_path: "/assets/img/posts/2022-11-02-Conditional Image Generation with PixelCNN Decoders"
---

> Van den Oord, Aaron, et al. "Conditional image generation with pixelcnn decoders." Advances in neural information processing systems 29 (2016).

# Introduction
이 논문은 기존의 PixelRNN과 PixelCNN을 제시한 논문[^1]을 발전시켰습니다.
해당 논문에서는 두 가지 형태의 PixelRNN\(Row LSTM, Diagonal BiLSTM\)과 PixelCNN을 제시합니다. 각 모델에 대한 자세한 내용은 해당 논문을 참조하시길 바랍니다. 여기서는 각 모델을 장단점을 바탕으로 어떻게 향상시켰는지에 대해 설명하겠습니다.

PixelRNN은 일반적으로 좋은 성능을 보여줍니다. 하지만, PixelCNN에 비해 학습이 느리다는 단점을 가지고 있습니다. 이는 PixelCNN이 병렬화가 가능하다는 장점 때문에 더 빠르게 학습킬 수 있습니다. 하지만, PixelCNN의 경우 blind spot이 존재한다는 단점이 있습니다. 이 때문에 PixelRNN에 비해 성능이 떨어지는 문제를 가지고 있습니다.

여기서는 두 모델의 장점을 결합한 Gated PixelCNN을 제안합니다. 이 모델이 학습하는데 걸리는 시간을 PixelRNN 대비 절반 이하로 줄였으며 성능 또한 그 이상이라고 합니다.

또한, 저자들은 Gated PixelCNN에 latent 벡터 임베딩을 조건으로 추가한 Conditional PixelCNN을 제안합니다. Conditional PixelCNN은 원-핫 엔코딩 형태로 조건을 주어 여러 클래스로부터 이미지를 생성하는데에 사용될 수 있습니다. 이외에도, 이미지의 high level 정보를 가지고 있는 임베딩을 사용하여 비슷한 특징을 가지고 있는 여러 다양한 이미지를 생성할 수 있습니다.

# Gated PixelCNN
## Gated Covolutional Layers

## Blind spot in the receptive field

## Conditional PixelCNN

## PixelCNN Auto-Encoders

# Experiments
## Unconditional Modeling with Gated PixelCNN
먼저, CIFAR-10 데이터 세트에 대해 Gated PixelCNN의 성능을 비교 분석하였습니다.

![Table 1](table_1.png){: .align-center}
*Table 1: CIFAR-10에 대해 여러 모델의 bits/dim(낮을수록 좋음) 성능, 괄호 안의 내용은 훈련할 때의 성능*

Gated PixelCNN은 기존의 PixelCNN 보다 0.11 *bits/dim* 낮은 수치를 보여주며, 생성된 샘플의 시각적 품질에 상당한 영향을 주었습니다. 이는 PixelRNN과 거의 비슷한 수준의 성능을 보여주고 있습니다.

![Table 2](table_2.png){: .align-center}
*Table 2: ImageNet에 대해 여러 모델의 bits/dim(낮을수록 좋음) 성능, 괄호 안의 내용은 훈련할 때의 성능*

그 다음에는 ImageNet 데이터 세트에 대해 Gated PixelCNN의 성능을 비교 분석하였습니다. 여기서 Gated PixelCNN은 PixelRNN보다 더 좋은 성능을 보여줍니다. 저자들은 Gated PixelCNN의 성능이 더 좋은 이유가 PixelRNN이 과소적합 되었기 때문이라고 말합니다. 이렇게 생각한 이유는 일반적으로 모델이 클수록 더 좋은 성능을 발휘하고 간단한 모델일수록 더 빠르게 학습되기 때문입니다.

## Conditioning on ImageNet Classes
두 번째 실험은 Gated PixelCNN을 사용하여 ImageNet 데이터셋의 class-conditional 모델링에 대한 것입니다. i번째 클래스에 대한 정보를 원-핫 엔코딩 형태인 $h_i$가 주어졌을 때 $p(x|h_i)$에 근사되도록 모델링하였습니다. 

이 작업을 통해 모델에게 전달되는 정보의 양은 단지 $\det(1000) \approx 0.003$ bits/pixel에 불과합니다. 그럼에도 불구하고, 이미지 생성에 클래스의 라벨을 조건을 주는 것이 log-likelihood에 큰 향상을 줄것이라 기대했지만 실제로는 큰 차이는 없었다고 합니다. 반면에, 저자들은 생성된 샘플들의 시각적인 품질에서 매우 큰 향상을 관찰할 수 있었다고 합니다.

![Figure 3](figure_3.png){: .align-center}
*Figure 3: Conditional PixelCNN으로부터 생성된 샘플*

Figure 3에서 8개의 서로 다른 클래스에 대한 샘플의 결과를 볼 수 있습니다. 생성된 이미지들은 각 클래스간에 확실히 구분이 가능하며 각 클래스별로 매우 다양한 이미지를 생성해냈습니다. 예를 들어, 이 모델은 서로 다른 각도와 조명 조건들로부터 비슷한 장면을 생성하였습니다. 이외에도 물체, 동물 그리고 배경들이 명확하게 생성되었다고 주장합니다.  

## Conditioning on Portrait Embeddings
저자들이 진행한 다음 실험은 어떠한 latent representation을 조건으로 주는 실험을 진행하였습니다. 먼저, 그들은 face detector를 활용하여 [Flickr](https://www.flickr.com/) 사이트의 이미지로부터 얼굴을 잘라내어 규모가 큰 초상화 데이터 세트를 생성하였습니다. 다만, 이렇게 생성된 데이터 세트의 이미지 품질은 천자만별인데 이는 많은 이미지들이 좋지 않은 환경에서 휴대폰을 통해 찍힌 이미지이기 때문입니다. 이러한 데이터 세트를 통해 학습된 convolutonal network의 top layer의 latent representation을 이번 실험에 사용합니다. 

이 네크워크는 triplet 손실 함수를 사용하여 훈련됩니다. 이는 특정 인물의 이미지 $x$에서 생성된 임베딩 $h$가 다른 사람의 임베딩과는 멀고 동일한 사람의 임베딩과는 같도록 보장합니다.

이후, 튜플\(이미지=$\mathrm{x}$, 임베딩=$\mathrm{h}$\)을 입력으로 하여 모델 $p(x \vert h)$에 근사되도록 훈련하였습니다. 훈련 세트에 있지 않은 사람의 새로운 이미지가 주어졌을 때 $h=f(x)$를 계산하고 해당 인물의 새로운 초상화를 생성합니다.

![Figure 4](figure_4.png){: .align-center}
*Figure 4: **왼쪽**: source image. **오른쪽**: high-level latent representation으로부터 새롭게 생성된 초상화.*

Figure 4를 통해 생성된 샘플을 확인할 수 있습니다. 소스 이미지의 많은 얼굴특징을 임베딩하고 다양한 자세, 조명 조건 등 여러 조건에서의 새로운 얼굴을 만들 수 있다는 점을 볼 수 있습니다.

![Figure 5](figure_5.png){: .align-center}
*Figure 5: 임베딩 공간에서 선형 보간된 결과가 주어졌을 때 PixelCNN에 의하여 생성된 결과. 가장 왼쪽과 오른쪽 이미지는 보간의 끝 점으로 사용됨.*

마지막으로 저자들은 이미지쌍의 임베딩간의 선형 보간[^2]된 결과가 조건으로 주어졌을 때 생성하는 실험을 진행하였습니다. 이 결과는 Figure 5를 통해 확인할 수 있습니다.

## PixelCNN Auto Encoder
이 실험은 auto-encoder의 디코더를 PixelCNN으로 사용하여 end-to-end 훈련을 진행합니다. 32x32 크기의 ImageNet 패치를 사용하며 MSE를 통해 최적화하여 auto-encoder를 훈련하였습니다. 모델의 bottleneck의 차원은 10 또는 100으로 설정하였습니다.

![Figure 6](figure_6.png){: .align-center}
*Figure 6: 왼쪽부터 오른쪽까지: 원본 이미지, MSE 함수로 훈련된 auto-encoder에 의해 복원된 이미지, PixelCNN auto-encoder의 조건부 샘플.*

Figure 6는 각 모델로부터 생성된 이미지를 보여줍니다. 
PixelCNN의 디코더와 함께 bottleneck에서 인코딩된 정보인 representaion $h$가 기존의 디코더를 사용한 것보다 질적으로 다르다는 것을 확인할 수 있습니다. 예를 들어, 가장 마지막 행에서 모델이 입력을 정확하게 다시 생성해내는 것이 아니라 다르지만 비슷한 사람이 있는 실내 공간을 생성하는 것을 볼 수 있습니다.

# Conclusion
저자들은 PixelCNN을 향상시킨 Gated PixelCNN과 Conditional PixelCNN을 제안하였습니다. 수직 및 수평 CNN을 통해 receptive field에서의 "blind spot"을 제거하여 기존의 한계를 극복하였습니다. 

1. Gated PixelCNN은 더욱 효율적으로 계산이 가능합니다.
1. Gated PixelCNN은 PixelRNN 이상의 성능을 보여줍니다.
1. Conditional PixelCNN은 클래스에 대한 조건이 주어졌을 때 해당 클래스에 대응되는 다양하고 현실적인 이미지를 이미지를 생성할 수 있습니다.
1. PixelCNN은 auto-encoder에서 강력한 디코더로써 사용될 수 있습니다.

# Limitation
하지만, 이러한 PixelCNN도 여전히 많은 한계를 가지고 있습니다.

1. PixelRNN을 압도할 만큼의 성능은 보여주지 못하고 있습니다.
1. 순차적인 구조는 생성이 진행될수록 에러가 커지는 단점을 가지고 있습니다. 
1. CNN 구조의 특성상 이미지의 디테일은 잘 잡아내지만, 전체적인 구조를 잡아내는 것에는 어려움이 있습니다.

이러한 문제를 해결하기 위해 PixelCNN++, PixelVAE 등이 이후에 제안되었습니다.

# Future Work
## Improvements
1. PixelVAE: A Latent Variable Model for Natural Images
: PixelCNN과 VAE를 결합한 모델입니다.

1. PixelCNN++
: Gated PixelCNN을 +시킨 모델입니다.

## Applications
1. WaveNet: A Generative Model for Raw Audio
1. Video Pixel Networks
1. Genrating Interpertable Images with Controllable Structure
1. Language Modeling with Gated Convolutional Networks

---
#### Reverse Footnote
[^1]: Van Den Oord, Aäron, Nal Kalchbrenner, and Koray Kavukcuoglu. "Pixel recurrent neural networks." International conference on machine learning. PMLR, 2016.
[^2]: linear interpolation
