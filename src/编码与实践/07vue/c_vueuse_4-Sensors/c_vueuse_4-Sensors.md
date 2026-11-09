# Sensors

## onClickOutside

<https://www.vueusejs.com/core/onClickOutside/>

监听元素外部的点击事件，对模态框和下拉菜单很有用。

### 基本用法

::: code-group

```vue [基本用法]
<template>
  <div ref="target">Hello world</div>
  <div>Outside element</div>
</template>

<script setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

const target = ref(null)
onClickOutside(target, event => console.log(event))
</script>
```

```ts [基本用法-源码]
import type { Fn } from '@vueuse/shared'
import { isIOS, noop } from '@vueuse/shared'
import type { MaybeElementRef } from '../unrefElement'
import { unrefElement } from '../unrefElement'
import { useEventListener } from '../useEventListener'
import type { ConfigurableWindow } from '../_configurable'
import { defaultWindow } from '../_configurable'

export interface OnClickOutsideOptions extends ConfigurableWindow {
  /**
   * List of elements that should not trigger the event.
   */
  ignore?: (MaybeElementRef | string)[]
  /**
   * Use capturing phase for internal event listener.
   * @default true
   */
  capture?: boolean
  /**
   * Run handler function if focus moves to an iframe.
   * @default false
   */
  detectIframe?: boolean
}

export type OnClickOutsideHandler<
  T extends { detectIframe: OnClickOutsideOptions['detectIframe'] } = { detectIframe: false }
> = (evt: T['detectIframe'] extends true ? PointerEvent | FocusEvent : PointerEvent) => void

let _iOSWorkaround = false

/**
 * Listen for clicks outside of an element.
 *
 * @see https://vueuse.org/onClickOutside
 * @param target
 * @param handler
 * @param options
 */
export function onClickOutside<T extends OnClickOutsideOptions>(
  target: MaybeElementRef,
  handler: OnClickOutsideHandler<{ detectIframe: T['detectIframe'] }>,
  options: T = {} as T
) {
  const { window = defaultWindow, ignore = [], capture = true, detectIframe = false } = options

  if (!window) return noop

  // Fixes: https://github.com/vueuse/vueuse/issues/1520
  // How it works: https://stackoverflow.com/a/39712411
  if (isIOS && !_iOSWorkaround) {
    _iOSWorkaround = true
    Array.from(window.document.body.children).forEach(el => el.addEventListener('click', noop))
    window.document.documentElement.addEventListener('click', noop)
  }

  let shouldListen = true

  const shouldIgnore = (event: PointerEvent) => {
    return ignore.some(target => {
      if (typeof target === 'string') {
        return Array.from(window.document.querySelectorAll(target)).some(
          el => el === event.target || event.composedPath().includes(el)
        )
      } else {
        const el = unrefElement(target)
        return el && (event.target === el || event.composedPath().includes(el))
      }
    })
  }

  const listener = (event: PointerEvent) => {
    const el = unrefElement(target)

    if (!el || el === event.target || event.composedPath().includes(el)) return

    if (event.detail === 0) shouldListen = !shouldIgnore(event)

    if (!shouldListen) {
      shouldListen = true
      return
    }

    handler(event)
  }

  const cleanup = [
    useEventListener(window, 'click', listener, { passive: true, capture }),
    useEventListener(
      window,
      'pointerdown',
      e => {
        const el = unrefElement(target)
        shouldListen = !shouldIgnore(e) && !!(el && !e.composedPath().includes(el))
      },
      { passive: true }
    ),
    detectIframe &&
      useEventListener(window, 'blur', event => {
        setTimeout(() => {
          const el = unrefElement(target)
          if (
            window.document.activeElement?.tagName === 'IFRAME' &&
            !el?.contains(window.document.activeElement)
          )
            handler(event as any)
        }, 0)
      }),
  ].filter(Boolean) as Fn[]

  const stop = () => cleanup.forEach(fn => fn())

  return stop
}
```

:::

### 使用组件

::: code-group

```vue [使用组件]
<template>
  <OnClickOutside
    @trigger="count++"
    :options="{
      ignore: [
        /* ... */
      ],
    }">
    <div>Click Outside of Me</div>
  </OnClickOutside>
</template>
```

```ts [使用组件-源码]
import { defineComponent, h, ref } from 'vue-demi'
import { onClickOutside } from '@vueuse/core'
import type { RenderableComponent } from '../types'
import type { OnClickOutsideOptions } from '.'

export interface OnClickOutsideProps extends RenderableComponent {
  options?: OnClickOutsideOptions
}

export const OnClickOutside = /* #__PURE__ */ defineComponent<OnClickOutsideProps>({
  name: 'OnClickOutside',
  props: ['as', 'options'] as unknown as undefined,
  emits: ['trigger'],
  setup(props, { slots, emit }) {
    const target = ref()
    onClickOutside(
      target,
      e => {
        emit('trigger', e)
      },
      props.options
    )

    return () => {
      if (slots.default) return h(props.as || 'div', { ref: target }, slots.default())
    }
  },
})
```

:::

### 使用指令

::: code-group

```vue [使用指令]
<script setup lang="ts">
import { ref } from 'vue'
import { vOnClickOutside } from '@vueuse/components'

const modal = ref(false)
function closeModal() {
  modal.value = false
}
</script>

<template>
  <button @click="modal = true">Open Modal</button>
  <div
    v-if="modal"
    v-on-click-outside="closeModal">
    Hello World
  </div>
</template>
```

```ts [使用指令-源码]
import { directiveHooks } from '@vueuse/shared'
import type { ObjectDirective } from 'vue-demi'
import { onClickOutside } from '.'
import type { OnClickOutsideHandler, OnClickOutsideOptions } from '.'

export const vOnClickOutside: ObjectDirective<
  HTMLElement,
  OnClickOutsideHandler | [(evt: any) => void, OnClickOutsideOptions]
> = {
  [directiveHooks.mounted](el, binding) {
    const capture = !binding.modifiers.bubble
    if (typeof binding.value === 'function') {
      ;(el as any).__onClickOutside_stop = onClickOutside(el, binding.value, { capture })
    } else {
      const [handler, options] = binding.value
      ;(el as any).__onClickOutside_stop = onClickOutside(
        el,
        handler,
        Object.assign({ capture }, options)
      )
    }
  },
  [directiveHooks.unmounted](el) {
    ;(el as any).__onClickOutside_stop()
  },
}

// alias
export { vOnClickOutside as VOnClickOutside }
```

:::
