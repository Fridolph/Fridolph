---
layout: home
hero:
  name: Web 开发学习宝典
  text: 从前端走向全栈与 AI 应用开发
  tagline: 理解一个概念，验证一个想法，记录一次成长。把零散的知识与实践，连接成自己的开发能力。
  actions:
    - theme: brand
      text: 从学习路线开始
      link: /学习路线/index
    - theme: alt
      text: 概念与原理
      link: /概念与原理/index
    - theme: alt
      text: 编码与实践
      link: /编码与实践/index
    - theme: alt
      text: 学习自测
      link: /学习自测/index
---

<script setup>
import LearningDomains from './.vitepress/theme/components/LearningDomains.vue'
import LearningCycle from './.vitepress/theme/components/LearningCycle.vue'
import { learningDomains } from './.vitepress/data/learning'
</script>

<LearningDomains :domains="learningDomains" />

<LearningCycle />
