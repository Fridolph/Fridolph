# Browser

## useImage

<https://www.vueusejs.com/core/useImage/>

在浏览器中响应式加载图像，你可以等待结果显示或显示一个回退方案

### 基本使用

::: code-group

```vue [基本用法]
<template>
  <span v-if="isLoading">Loading ...</span>
  <img
    v-else
    :src="avatarUrl"
    alt="图片" />
</template>
<script setup>
import { useImage } from '@vueuse/core'
</script>
```

```ts [源码]
import { watch } from 'vue-demi'
import type { MaybeRefOrGetter } from '@vueuse/shared'
import { toValue } from '@vueuse/shared'
import type { UseAsyncStateOptions } from '../useAsyncState'
import { useAsyncState } from '../useAsyncState'

export interface UseImageOptions {
  /** Address of the resource */
  src: string
  /** Images to use in different situations, e.g., high-resolution displays, small monitors, etc. */
  srcset?: string
  /** Image sizes for different page layouts */
  sizes?: string
  /** Image alternative information */
  alt?: string
  /** Image classes */
  class?: string
  /** Image loading */
  loading?: HTMLImageElement['loading']
  /** Image CORS settings */
  crossorigin?: string
  /** Referrer policy for fetch https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy */
  referrerPolicy?: HTMLImageElement['referrerPolicy']
}

async function loadImage(options: UseImageOptions): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const { src, srcset, sizes, class: clazz, loading, crossorigin, referrerPolicy } = options

    img.src = src

    if (srcset) img.srcset = srcset

    if (sizes) img.sizes = sizes

    if (clazz) img.className = clazz

    if (loading) img.loading = loading

    if (crossorigin) img.crossOrigin = crossorigin

    if (referrerPolicy) img.referrerPolicy = referrerPolicy

    img.onload = () => resolve(img)
    img.onerror = reject
  })
}

/**
 * 在浏览器中响应式加载图像，您可以等待结果显示它.
 *
 * @see https://vueuse.org/useImage
 * @param options Image attributes, as used in the <img> tag
 * @param asyncStateOptions
 */
export function useImage<Shallow extends true>(
  options: MaybeRefOrGetter<UseImageOptions>,
  asyncStateOptions: UseAsyncStateOptions<Shallow> = {}
) {
  const state = useAsyncState<HTMLImageElement | undefined>(
    () => loadImage(toValue(options)),
    undefined,
    {
      resetOnExecute: true,
      ...asyncStateOptions,
    }
  )

  watch(
    () => toValue(options),
    () => state.execute(asyncStateOptions.delay),
    { deep: true }
  )

  return state
}

export type UseImageReturn = ReturnType<typeof useImage>
```

:::

### 作为组件

::: code-group

```vue [作为无渲染组件]
<template>
  <UseImage src="https://place.dog/300/200">
    <template #loading> Loading.. </template>

    <template #error> Failed </template>
  </UseImage>
</template>
<script setup>
import UseImage from '@vueuse/components'
</script>
```

```ts [源码]
import { defineComponent, h, reactive } from 'vue-demi'
import { useImage } from '../useImage'
import type { UseImageOptions } from '../useImage'

import type { RenderableComponent } from '../types'

export const UseImage = /* #__PURE__ */ defineComponent<UseImageOptions & RenderableComponent>({
  name: 'UseImage',
  props: [
    'src',
    'srcset',
    'sizes',
    'as',
    'alt',
    'class',
    'loading',
    'crossorigin',
    'referrerPolicy',
  ] as unknown as undefined,
  setup(props, { slots }) {
    const data = reactive(useImage(props))

    return () => {
      if (data.isLoading && slots.loading) return slots.loading(data)
      else if (data.error && slots.error) return slots.error(data.error)

      if (slots.default) return slots.default(data)

      return h(props.as || 'img', props)
    }
  },
})
```

:::
