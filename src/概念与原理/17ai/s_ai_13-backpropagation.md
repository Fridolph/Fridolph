# 反向传播

## 概念

反向传播（Backpropagation）是训练神经网络的核心算法，用于**高效地计算损失函数相对于网络各层参数的梯度**。有了梯度，才可以用梯度下降来更新参数。

核心思想：利用**链式法则**，将输出层的误差逐层反向传播到输入层，沿途计算每个参数的梯度。

## 工作原理

### 前向传播（Forward Pass）

数据从输入层经过各隐藏层，逐层计算，最终得到预测值和损失值：

```
输入 → 层1 → 层2 → ... → 输出 → 损失
```

### 反向传播（Backward Pass）

从损失出发，沿网络反向逐层计算梯度：

```
∂L/∂W⁽ⁿ⁾ = ∂L/∂a⁽ⁿ⁾ · ∂a⁽ⁿ⁾/∂z⁽ⁿ⁾ · ∂z⁽ⁿ⁾/∂W⁽ⁿ⁾
```

- ∂L/∂W：我们要的参数梯度
- 链式法则让梯度能从输出端一直算回输入端
- 每一层的梯度计算依赖上一层的计算结果

### 参数更新

```
W_new = W_old - learning_rate · ∂L/∂W
```

## 计算图（Computation Graph）

现代深度学习框架（PyTorch、TensorFlow）使用**计算图**来自动求导：

- 每个前向计算操作被记录为图的节点
- 反向传播时，自动沿图反向计算梯度
- 这就是**自动微分（Autograd）**

开发者不需要手动推导和实现反向传播公式。

## 常见问题

### 梯度消失（Vanishing Gradient）

深层网络中，梯度在反向传播时逐层减小，导致靠近输入层的参数几乎不更新。

- **原因**：Sigmoid/Tanh 激活函数的导数 ≤ 1，多层相乘后趋近于 0
- **解决**：ReLU 激活函数、残差连接（ResNet）、层归一化

### 梯度爆炸（Exploding Gradient）

梯度在反向传播时逐层放大，导致参数更新过大，模型无法收敛。

- **解决**：梯度裁剪（Gradient Clipping）、权重初始化策略

## 面试常问

- 反向传播的本质是什么？为什么叫"反向"？
- 梯度消失和梯度爆炸如何解决？
- PyTorch/TensorFlow 是如何自动计算梯度的？

## 参考

- [Backpropagation - 3Blue1Brown](https://www.youtube.com/watch?v=Ilg3gGewQ5U)
- [CS231n: Backpropagation](https://cs231n.github.io/optimization-2/)
