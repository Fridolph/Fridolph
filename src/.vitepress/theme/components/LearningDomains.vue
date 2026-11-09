<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { withBase } from 'vitepress'
import type { LearningDomain } from '../../data/learning'
import { useScrollReveal } from '../composables/useScrollReveal'

defineProps<{ domains: LearningDomain[] }>()

const root = useTemplateRef('root')
useScrollReveal(root)
</script>

<template>
  <div ref="root" class="learning-domains">
    <nav class="domain-index" aria-label="学习领域快捷入口">
      <span class="index-label">探索学习地图</span>
      <a v-for="domain in domains" :key="domain.id" class="index-link" :href="`#${domain.id}`">
        <span class="index-number" aria-hidden="true">{{ domain.number }}</span>{{ domain.title }}
      </a>
    </nav>
    <section v-for="domain in domains" :id="domain.id" :key="domain.id" class="domain" :aria-labelledby="`${domain.id}-title`">
      <div class="domain-content">
        <header class="domain-heading" data-reveal>
          <p class="domain-eyebrow"><span class="domain-number">{{ domain.number }}</span><span class="eyebrow-rule" aria-hidden="true"></span>学习领域</p>
          <h2 :id="`${domain.id}-title`" class="domain-title">{{ domain.title }}</h2>
          <p class="domain-description">{{ domain.description }}</p>
          <ol class="domain-stages" aria-label="建议学习顺序">
            <li v-for="stage in domain.stages" :key="stage" class="domain-stage">{{ stage }}</li>
          </ol>
          <p class="domain-focus">{{ domain.focus }}</p>
        </header>
        <div class="topic-grid">
          <a v-for="(topic, index) in domain.topics" :key="topic.title" class="topic" :href="withBase(topic.link)" data-reveal :data-reveal-delay="index * 45">
            <span class="topic-icon" :class="{ 'has-image': 'src' in topic.icon }" aria-hidden="true">
              <img v-if="'src' in topic.icon" :src="withBase(topic.icon.src)" alt="" width="36" height="36" loading="lazy" />
              <span v-else>{{ topic.icon.emoji }}</span>
            </span>
            <span class="topic-copy">
              <span class="topic-title">{{ topic.title }}</span>
              <span class="topic-description">{{ topic.description }}</span>
            </span>
          </a>
        </div>
      </div>
      <div class="domain-footer" aria-hidden="true"><span>由浅入深 · 在实践中连接</span><span>{{ domain.number }} / 05</span></div>
    </section>
  </div>
</template>

<style scoped>
.learning-domains { margin-top: 32px; }
.domain-index { display: flex; align-items: center; flex-wrap: wrap; gap: 8px 20px; padding: 22px 0; border-top: 1px solid var(--vp-c-divider); }
.index-label { margin-right: auto; color: var(--vp-c-text-2); font-size: 12px; letter-spacing: .08em; }
.index-link { display: inline-flex; align-items: center; gap: 6px; padding: 5px 0; color: var(--vp-c-text-2); text-decoration: none; font-size: 12px; }
.index-link:hover { color: var(--vp-c-brand-1); }
.index-number { color: var(--vp-c-brand-1); font: 11px var(--vp-font-family-mono); }
.domain { position: relative; display: flex; flex-direction: column; justify-content: center; padding: 72px 0 44px; border-top: 1px solid var(--vp-c-divider); scroll-margin-top: calc(var(--vp-nav-height) + 24px); }
.domain-content { display: grid; gap: 36px; }
.domain-heading { max-width: 600px; }
.domain-eyebrow { display: flex; align-items: center; gap: 12px; margin: 0 0 24px; color: var(--vp-c-text-2); font-size: 11px; letter-spacing: .12em; }
.domain-number { color: var(--vp-c-brand-1); font: 500 16px/1 var(--vp-font-family-mono); letter-spacing: -.04em; }
.eyebrow-rule { width: 28px; height: 1px; background: var(--vp-c-divider); }
.domain-title { margin: 0; padding: 0; border: 0; font-size: clamp(30px, 3vw, 44px); font-weight: 650; line-height: 1.25; letter-spacing: -.04em; }
.domain-description { margin: 20px 0 0; color: var(--vp-c-text-2); font-size: 15px; line-height: 1.9; text-wrap: pretty; }
.domain-stages { display: flex; flex-wrap: wrap; gap: 8px 0; margin: 26px 0 0; padding: 0; list-style: none; }
.domain-stage { display: inline-flex; align-items: center; margin: 0; color: var(--vp-c-text-1); font-size: 11px; font-weight: 500; }
.domain-stage + .domain-stage::before { content: '/'; margin: 0 10px; color: var(--vp-c-text-3); font-weight: 400; }
.domain-focus { margin: 18px 0 0; padding-left: 12px; border-left: 2px solid var(--vp-c-brand-soft); color: var(--vp-c-text-2); font-size: 12px; line-height: 1.8; }
.topic-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; align-content: center; }
.topic { display: flex; align-items: flex-start; gap: 16px; min-width: 0; padding: 24px 22px; border: 1px solid var(--vp-c-divider); border-radius: 12px; text-decoration: none; background: var(--vp-c-bg-soft); transition: border-color .2s, background-color .2s, box-shadow .2s; }
.topic:hover { border-color: var(--vp-c-brand-1); background: var(--vp-c-bg); box-shadow: 0 6px 22px -16px var(--vp-c-brand-1); }
.topic:focus-visible { outline: 2px solid var(--vp-c-brand-1); outline-offset: 3px; }
.topic-icon { display: flex; flex: 0 0 52px; align-items: center; justify-content: center; width: 52px; height: 52px; border-radius: 11px; background: var(--vp-c-default-soft); font-size: 28px; line-height: 1; }
.topic-icon.has-image { background: #fff; border: 1px solid var(--vp-c-divider); }
.topic-icon img { display: block; width: 36px; height: 36px; object-fit: contain; }
.topic-copy { display: flex; flex-direction: column; gap: 8px; min-width: 0; }
.topic-title { color: var(--vp-c-text-1); font-size: 16px; font-weight: 600; line-height: 1.5; text-wrap: pretty; }
.topic-description { color: var(--vp-c-text-2); font-size: 13px; line-height: 1.85; overflow-wrap: anywhere; }
.domain-footer { display: flex; justify-content: space-between; gap: 16px; margin-top: 42px; color: var(--vp-c-text-3); font: 10px/1.5 var(--vp-font-family-mono); letter-spacing: .04em; }
@media (min-width: 1100px) {
  .domain { min-height: calc(100svh - var(--vp-nav-height)); }
  .domain-content { grid-template-columns: minmax(0, .82fr) minmax(0, 2fr); align-items: center; gap: 48px; }
  .topic-grid > .topic:last-child:nth-child(odd) { grid-column: 1 / -1; }
}
@media (max-width: 639px) {
  .domain-index { gap: 6px 16px; }
  .index-label { width: 100%; margin-bottom: 8px; }
  .domain { padding: 48px 0 28px; }
  .domain-content { gap: 28px; }
  .domain-eyebrow { margin-bottom: 18px; }
  .domain-description { margin-top: 14px; font-size: 14px; }
  .domain-stages { margin-top: 20px; }
  .topic-grid { grid-template-columns: 1fr; gap: 10px; }
  .topic { padding: 20px 18px; gap: 14px; }
  .topic-title { font-size: 15px; }
  .domain-footer { margin-top: 28px; }
}
@media (prefers-reduced-motion: reduce) { .topic { transition: none; } }
</style>
