<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { withBase } from 'vitepress'
import { learningSteps } from '../../data/learning'
import { useScrollReveal } from '../composables/useScrollReveal'

const root = useTemplateRef('root')
useScrollReveal(root)
</script>

<template>
  <section id="learning-cycle" ref="root" class="learning-cycle" aria-labelledby="learning-cycle-title">
    <header class="cycle-heading" data-reveal>
      <div>
        <p class="cycle-eyebrow">从输入到输出 · 持续生长</p>
        <h2 id="learning-cycle-title" class="cycle-title">让知识与实践<br />彼此连接</h2>
      </div>
      <p class="cycle-intro">读懂一个概念只是开始。把它放进真实问题里，用代码验证，用复盘澄清，再通过表达与反馈，把一次练习变成能够积累的开发能力。</p>
    </header>

    <ol class="cycle-timeline" aria-label="从知识到实践的五个环节">
      <li v-for="(step, index) in learningSteps" :key="step.number" class="cycle-step" data-reveal :data-reveal-delay="index * 50">
        <span class="step-number" aria-hidden="true">{{ step.number }}</span>
        <div class="step-content">
          <span class="step-verb">{{ step.verb }}</span>
          <h3 class="step-title">{{ step.title }}</h3>
          <p class="step-description">{{ step.description }}</p>
          <p class="step-outcome">{{ step.outcome }}</p>
          <a class="step-link" :href="step.link.startsWith('/') ? withBase(step.link) : step.link">{{ step.linkLabel }}</a>
        </div>
      </li>
    </ol>

    <div class="cycle-summary" data-reveal>
      <p class="summary-copy">每一轮都留下证据，<br class="mobile-break" />下一次就能走得更远。</p>
      <a class="route-link" :href="withBase('/学习路线/index')">查看完整学习路线</a>
    </div>

    <nav class="cycle-projects" aria-label="连接学习与实践的项目">
      <a class="project-link" href="https://github.com/Fridolph/AI-Journey-land"><span class="project-role">实践载体</span><span>AI-Journey-land</span></a>
      <a class="project-link" href="https://fridolph.github.io/fridolph-blog/"><span class="project-role">表达与复盘</span><span>个人博客</span></a>
      <a class="project-link" href="https://fridolph.github.io/AI-Journey-Fighting/"><span class="project-role">AI 学习探索</span><span>AI Journey Fighting</span></a>
    </nav>
  </section>
</template>

<style scoped>
.learning-cycle { padding: 88px 0 32px; border-top: 1px solid var(--vp-c-divider); scroll-margin-top: calc(var(--vp-nav-height) + 24px); }
.cycle-heading { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: end; }
.cycle-eyebrow { margin: 0 0 20px; color: var(--vp-c-brand-1); font-size: 11px; letter-spacing: .12em; }
.cycle-title { margin: 0; padding: 0; border: 0; font-size: clamp(28px, 3vw, 40px); line-height: 1.4; letter-spacing: -.035em; }
.cycle-intro { max-width: 420px; margin: 0 0 4px; color: var(--vp-c-text-2); font-size: 14px; line-height: 2; text-wrap: pretty; }
.cycle-timeline { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 24px; margin: 56px 0 0; padding: 0; list-style: none; }
.cycle-step { position: relative; min-width: 0; margin: 0; }
.cycle-step:not(:last-child)::after { position: absolute; top: 20px; left: 40px; width: calc(100% + 24px - 40px); height: 1px; background: var(--vp-c-divider); content: ''; }
.step-number { display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border: 1px solid var(--vp-c-brand-1); border-radius: 50%; background: var(--vp-c-bg); color: var(--vp-c-brand-1); font: 12px/1 var(--vp-font-family-mono); }
.step-content { display: flex; flex-direction: column; align-items: flex-start; height: calc(100% - 40px); padding-top: 24px; }
.step-verb { color: var(--vp-c-text-2); font-size: 10px; letter-spacing: .12em; }
.step-title { margin: 8px 0 0; font-size: 18px; font-weight: 600; line-height: 1.5; letter-spacing: -.02em; }
.step-description { margin: 16px 0 0; color: var(--vp-c-text-2); font-size: 13px; line-height: 1.9; }
.step-outcome { margin: 20px 0 16px; padding-top: 16px; border-top: 1px solid var(--vp-c-divider); color: var(--vp-c-text-2); font-size: 11px; line-height: 1.8; }
.step-link { margin-top: auto; padding: 4px 0; color: var(--vp-c-brand-1); font-size: 12px; text-decoration: underline; text-underline-offset: 4px; }
.cycle-summary { display: flex; align-items: center; justify-content: space-between; gap: 24px; margin-top: 56px; padding: 28px 32px; border-left: 2px solid var(--vp-c-brand-1); border-radius: 0 8px 8px 0; background: var(--vp-c-bg-soft); }
.summary-copy { margin: 0; color: var(--vp-c-text-1); font-size: 16px; line-height: 1.8; }
.route-link { flex-shrink: 0; padding: 9px 18px; border: 1px solid var(--vp-c-brand-1); border-radius: 6px; color: var(--vp-c-brand-1); font-size: 12px; text-decoration: none; transition: background-color .2s; }
.route-link:hover { background: var(--vp-c-brand-soft); }
.mobile-break { display: none; }
.cycle-projects { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; margin-top: 36px; }
.project-link { display: flex; align-items: center; flex-wrap: wrap; gap: 6px 14px; min-width: 0; padding: 8px 0; color: var(--vp-c-text-1); font-size: 12px; text-decoration: none; }
.project-link:hover { color: var(--vp-c-brand-1); }
.project-role { color: var(--vp-c-text-2); font-size: 10px; }
.step-link:focus-visible, .route-link:focus-visible, .project-link:focus-visible { outline: 2px solid var(--vp-c-brand-1); outline-offset: 4px; }
@media (max-width: 959px) {
  .cycle-heading { gap: 32px; }
  .cycle-timeline { grid-template-columns: 1fr; gap: 0; margin-top: 40px; }
  .cycle-step { display: grid; grid-template-columns: 40px minmax(0, 1fr); gap: 24px; padding-bottom: 36px; }
  .cycle-step:last-child { padding-bottom: 0; }
  .cycle-step:not(:last-child)::after { top: 40px; left: 20px; width: 1px; height: calc(100% - 40px); }
  .step-content { height: auto; padding-top: 2px; }
  .step-description { max-width: 520px; margin-top: 10px; }
  .step-outcome { margin: 14px 0 10px; padding-top: 12px; }
  .cycle-projects { gap: 16px; }
}
@media (max-width: 639px) {
  .learning-cycle { padding: 52px 0 16px; }
  .cycle-heading { grid-template-columns: 1fr; gap: 20px; }
  .cycle-eyebrow { margin-bottom: 16px; }
  .cycle-step { gap: 18px; }
  .cycle-summary { flex-direction: column; align-items: flex-start; gap: 16px; margin-top: 36px; padding: 22px; }
  .summary-copy { font-size: 15px; }
  .mobile-break { display: inline; }
  .cycle-projects { grid-template-columns: 1fr; gap: 8px; margin-top: 24px; }
}
@media (prefers-reduced-motion: reduce) { .route-link { transition: none; } }
</style>
