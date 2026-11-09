# 机器学习

## 概念

机器学习（Machine Learning，ML）是 AI 的核心子领域，核心思想是**让计算机从数据中自动学习规律和模式，而不需要显式编程**。传统程序是"给定规则+数据 → 输出结果"，而机器学习是"给定数据+结果 → 学习出规则"。

机器学习本质上是**寻找一个函数 f(x)，使得给定输入 x 后，输出 ŷ 尽可能接近真实值 y**。这个寻找过程称为"训练"。

## 三大学习范式

### 监督学习（Supervised Learning）

训练数据包含**输入和对应的标签**，目标是学习从输入到标签的映射关系。

- **分类（Classification）**：预测离散标签，如垃圾邮件检测、图像识别
- **回归（Regression）**：预测连续数值，如房价预测、温度预测
- 常见算法：线性回归、决策树、SVM、神经网络

### 无监督学习（Unsupervised Learning）

训练数据**只有输入没有标签**，目标是发现数据的内在结构。

- **聚类（Clustering）**：将相似数据分组，如用户分群、文档归类
- **降维（Dimensionality Reduction）**：压缩数据维度并保留关键信息，如 PCA
- **关联规则**：发现数据中的关联关系，如购物篮分析

### 强化学习（Reinforcement Learning）

智能体通过与**环境交互**，根据奖励信号学习最优策略。

- **核心要素**：Agent、Environment、State、Action、Reward
- **典型算法**：Q-Learning、Policy Gradient、PPO
- **代表性应用**：AlphaGo、自动驾驶、游戏 AI

## 面试常问

- 监督学习和无监督学习的区别？各举一个前端场景。
- 什么是过拟合？如何判断和防止？
- 机器学习模型部署到前端的几种方式（如 TensorFlow.js）

## 训练与推理

- **训练（Training）**：用大量数据和算力学习模型参数的过程，在服务器端进行。
- **推理（Inference）**：用训练好的模型对新数据进行预测，可以在客户端（如浏览器中通过 WebGPU）进行。

## 参考

- [Machine Learning - Wikipedia](https://en.wikipedia.org/wiki/Machine_learning)
- [Google Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course)
