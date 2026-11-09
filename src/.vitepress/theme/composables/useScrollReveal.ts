import { onBeforeUnmount, onMounted, type Ref } from 'vue'

// 内容默认可见；动画只作渐进增强，不阻断 SSR、键盘访问或无脚本阅读。
export function useScrollReveal(root: Readonly<Ref<HTMLElement | null>>) {
  let observer: IntersectionObserver | undefined
  let preference: MediaQueryList | undefined
  const animations = new Set<Animation>()

  function stopMotion() {
    observer?.disconnect()
    animations.forEach(animation => animation.cancel())
    animations.clear()
  }

  function onPreferenceChange(event: MediaQueryListEvent) {
    if (event.matches) stopMotion()
  }

  onMounted(() => {
    preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    preference.addEventListener('change', onPreferenceChange)
    if (preference.matches || !root.value || !('IntersectionObserver' in window)) return

    observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        observer?.unobserve(entry.target)
        const element = entry.target as HTMLElement
        if (element.contains(document.activeElement) || !element.animate) continue

        const animation = element.animate(
          [
            { opacity: 0, transform: 'translateY(18px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ],
          {
            duration: 560,
            delay: Math.min(Number(element.dataset.revealDelay) || 0, 220),
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            fill: 'backwards',
          },
        )
        animations.add(animation)
        animation.onfinish = () => animations.delete(animation)
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' })

    root.value.querySelectorAll('[data-reveal]').forEach(element => observer?.observe(element))
  })

  onBeforeUnmount(() => {
    stopMotion()
    preference?.removeEventListener('change', onPreferenceChange)
  })
}
