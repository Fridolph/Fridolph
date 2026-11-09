<script setup lang="ts">
import { withBase } from 'vitepress'
import ImageViewer from 'vitepress-plugin-image-viewer/lib/vImageViewer.vue'

defineProps<{ src: string; alt: string; inline?: boolean }>()
</script>

<template>
  <ImageViewer :src="withBase(src)" :alt="alt" :inline="inline" />
</template>
