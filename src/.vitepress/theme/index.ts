import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { useRoute } from 'vitepress'
import imageViewer from 'vitepress-plugin-image-viewer'
import SiteImage from './components/SiteImage.vue'
import 'viewerjs/dist/viewer.min.css'
import './theme.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 保留现有文章的 <Image> 组件接口。
    // eslint-disable-next-line vue/multi-word-component-names, vue/no-reserved-component-names
    app.component('Image', SiteImage)
  },
  setup() {
    imageViewer(useRoute())
  },
} satisfies Theme
