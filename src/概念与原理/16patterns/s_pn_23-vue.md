https://www.patterns.dev/vue

# Vue

Vue 是一个流行的渐进式 JavaScript 框架，用于构建用户界面。不同于其他一体化框架，Vue 的设计理念使其能够逐步采用。这意味着它的起始点可以像 jQuery 一样简单，但当它与现代工具和辅助库结合使用时，它具有支持复杂应用的潜力。

理解和利用 Vue 的模式对于编写干净、高效且易于维护的代码大有裨益。在本网站中，我们将详细介绍流行的 Vue 特定模式和行为，涵盖如下概念：组合、脚本设置、状态管理、提供/注入、动态组件等等。无论您是 Vue 新手还是想了解一些有用的模式，我们都将为您提供帮助！话虽如此，让我们深入了解 Vue 的模式的世界。

# Design Patterns

## Components

Vue 组件是 Vue 应用程序的构建块，允许我们在其中组合标记（HTML）、逻辑（JS）和样式（CSS）。

在 Vue 应用程序中工作时，重要的是要了解，用户界面中所显示的几乎每个元素通常都是 Vue 组件的一部分。这是因为 Vue 应用程序通常由嵌套在组件中的组件组成，形成层次结构。

可重用性和可维护性是构建结构良好的组件的主要原因，因此在构建应用程序时尤其重要。

为了更好地理解组件，我们将继续创建一个。在不包含构建过程（例如 Webpack）的应用程序中创建 Vue 组件的最简单方法是创建一个包含 Vue 特定选项的普通 JavaScript 对象。

```js
export default {
  props: ['name'],
  template: `<h1>Hello, my name is {{ name }}</h1>`,
}
```

该组件定义了一个 props 属性，它接受一个名为 name 的单一属性。Props 是一种从父组件向子组件传递数据的方式。模板属性定义了组件的 HTML 模板。在这种情况下，它包含一个`<h1>`标题标签，显示文本“Hello，my name is”，后面跟着使用 Vue 的双大括号语法渲染的 name 属性的值`{{ }}`。

除了将组件定义为普通的 JavaScript 对象外，Vue 中最常见的创建组件的方式是使用单文件组件（SFCs）。单文件组件允许我们在一个特殊的.vue 文件中定义组件的 HTML、CSS 和 JS，如下所示：

```vue
<template>
  <h1>Hello, my name is {{ name }}</h1>
</template>

<script setup>
const { name } = defineProps(['name'])
</script>
```

### Components = building blocks

我们将通过一个简单的练习来说明如何将组件拆分为较小的组件。考虑以下虚构的 Tweet 组件：

可以用以下方式实现上述组件：

从上面的组件可以看出，由于它非常集中，可能很难对其进行操作，并且也很难重复使用它的个别部分。为了使事情更具可组合性，我们可以从这个组件中提取出几个较小的组件。

<Image src="/16patterns/vue1.png" alt="拆分组件" />

我们可以让主要的 Tweet 组件成为 TweetUser 和 TweetDetails 组件的父组件。TweetUser 将显示用户信息，并且是显示用户头像的 TweetAvatar 组件的父组件。TweetDetails 将简单地显示推文中的额外信息，如推文文本和提交日期。组件树如下所示：

首先，我们可以创建子组件 TweetAvatar，用于包含头像图像元素。

然后，我们可以创建 TweetUser 组件，该组件呈现 TweetAvatar 组件和相关用户信息。

我们可以创建 TweetDetails 组件来呈现推文中的剩余信息。

最后，我们可以使用这些新创建的子组件来简化父组件 Tweet 的模板。

```vue
<template>
  <div class="Tweet">
    <image
      class="Tweet-image"
      :src="image.imageUrl"
      :alt="image.description"
    />
    <TweetUser :author="author" />
    <TweetDetails
      :text="text"
      :date="date"
    />
  </div>
</template>

<script setup>
// ...
</script>
```

虽然提取组件似乎是一项繁琐的工作，但对于大型应用程序的编码而言，拥有可重用的组件可以使事情变得更容易。简化组件时的一个良好标准是——如果您的 UI 中的某个部分被多次使用（按钮、面板、头像），或者本身足够复杂（应用程序、FeedStory、评论），那么它是一个很好的候选对象，可以提取为一个单独的组件。

### 响应状态（Reactive state）

响应状态是 Vue 组件中的一个基本概念，使开发者能够创建动态和响应式的用户界面。它允许组件自动更新并反映其数据的更改。

在 Vue 中，我们可以使用 ref()（用于独立的原始值）和 reactive()（用于对象）来定义响应式数据属性。让我们考虑一个简单的计数器组件示例：

```vue
<template>
  <div>
    <h2>Counter: {{ count }}</h2>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)

const increment = () => {
  count.value++
}

const decrement = () => {
  count.value--
}
</script>
```

Vue 组件中的响应状态提供了一种无缝方式来管理和跟踪数据更改，使构建互动和动态用户界面变得更容易。通过响应式状态，组件可以自动更新视图，确保用户始终看到最新数据。这种机制显著提高了开发效率和用户体验。

结论
本文旨在对组件的概念进行简单介绍。在其他文章和指南中，我们将更深入地了解使用 Vue 和 Vue 组件时的常见和重要模式。

## Composables 组合

### Options API

在 Vue 引入 Composition API 之前，开发者依赖于 Options API 来组织组件逻辑，包括响应式数据、生命周期方法、计算属性等等。Options API 允许在特定选项中定义这些方面，如下例所示：

```vue
<script>
export default {
  name: 'MyComponent',
  props: {
    // props
  },
  data() {
    // data
  },
  computed: {
    // computed properties
  },
  watch: {
    // properties to watch
  },
  methods: {
    // methods
  },
  created() {
    // lifecyle methods like created
  },
  // ...
}
</script>
```

虽然这种方法在 Vue v3 中仍然适用并达到了其目的，但随着组件变得更大和更复杂，管理和维护它们可能会变得具有挑战性。在特定选项中定义组件逻辑可能会使代码更难阅读和理解，特别是在处理复杂的组件时更是如此。在此设置中，在组件之间提取和重用通用逻辑也会很困难。

<Image src="/16patterns/optionsApi.png" alt="optionsApi" />

尽管这个组件很小，但里面的逻辑已经错综交织。有些部分专门用于计数器的功能，而其他部分则涉及宽度逻辑。随着组件的增长，在组件内部组织和定位相关逻辑将变得更加具有挑战性。

为了应对这些挑战，Vue 团队在 Vue3 中引入了 Composition API。

简而言之，Composition API 提供了一种更灵活、更直观的方式来组织和管理 Vue 组件内部的逻辑。它允许开发者组合不同的函数和 API 来构建所需的功能，而不是局限于传统的 Options API 方法。这有助于将组件逻辑分解为更小、更易管理的块，使其更容易理解和维护。

组件（Composables）

基于我们之前的代码示例，可能仍有人会疑惑 setup()函数在开发过程中提供了哪些优势，因为看起来它仅仅要求我们在一个函数内部声明组件选项。

采用组合式 API 的绝佳好处之一是能够在组件之间提取和重用共享逻辑。这是由我们可简单声明使用 Vue 全局可用的组合式函数的函数这一事实驱动的，我们的函数可以很容易地在多个组件中使用以实现相同的结果。

通过使用 Composition API 设置中的可组合函数，我们能够把应用程序的上下文拆分成更小、可重用的部分，从而使逻辑分离。让我们可视化一下我们刚刚做出的更改，与初始的 Options API 示例组件相比。

<Image src="/16patterns/compositionApi.png" alt="compositionApi" />

在 Vue 中使用可组合函数使我们更容易将组件的逻辑拆分为几个较小的部分。由于我们不再局限于在 Options API 的特定选项中组织代码，因此现在重用相同的具有状态逻辑的组件变得更加容易。

借助可组合函数，我们具有在组件之间提取和重用共享逻辑的灵活性。这种关注点分离使我们能够专注于每个可组合函数中的特定功能，使我们的代码更加模块化并且易于维护。

通过将逻辑分解为更小、可重用的部分，我们可以使用这些可组合函数来组合我们的组件，汇集必要的功能而不重复代码。这种方法促进了代码的重用性，并降低了代码重复和不一致的风险。

此外，使用 Composition API 提供了更好的组件逻辑的可读性和可理解性。每个可组合函数都封装了组件行为的特定方面，使其更易于推理和测试。它还使团队成员之间的合作更加轻松，因为代码变得更加结构化并且有组织。

最后，使用 Composition API 构建 Vue 应用程序可以实现更好的类型推断。由于 Composition API 帮助我们使用变量和标准的 JavaScript 函数来处理组件逻辑，因此使用像 TypeScript 这样的静态类型系统构建大型 Vue 应用程序变得更加容易！

## Container/Presentational Pattern 容器模式

丹·阿布拉莫夫在 2015 年发表了一篇题为《Presentational and Container Components》的文章，改变了许多开发者对 React 中组件架构的看法。他引入了一种模式，将组件分为两类：展示组件和容器组件（或智能组件）。展示组件关注组件的外观和展示方式，不指定如何加载或更改数据，而是只通过属性接收数据和回调。容器组件关注组件的功能实现，为展示组件或其他容器组件提供数据和行为。虽然这种模式主要与 React 相关，但其基本原则在其他库和框架中也被采纳并适应于不同的形式。丹的区分提供了一种更清晰、更可扩展的方式来构建 JavaScript 应用程序。通过明确不同类型组件的职责，开发者可以确保 UI 组件（展示组件）和逻辑（容器）的更好复用性。

我们的想法是，如果我们想改变某个事物的外观（如按钮的设计），我们可以这样做而无需触及应用程序的逻辑。相反，如果我们需要改变数据的流动或处理方式，展示组件将保持不变，确保 UI 的一致性。然而，随着 React 中的 hooks 和 Vue 3 中的组合 API 的出现，展示组件和容器之间的清晰边界开始变得模糊。Hooks 和组合 API 开始允许开发者封装和复用状态和逻辑，而不必局限于基于类的容器组件或选项 API。因此，容器/展示模式并不像过去那样严格遵守。尽管这样说，我们将在本文中讨论这种模式一段时间，因为它在某些时候仍然很有帮助。

我们希望通过将这个过程分为两部分来强化关注点分离：

- 展示组件：关注如何将数据展示给用户的组件
- 容器组件：关注展示给用户的是什么数据的组件

### 展示组件

展示组件通过 props 接收数据。其主要功能是按我们希望的方式显示接收到的数据，包括样式，而不修改这些数据。
让我们看一下显示狗狗图片的示例。在渲染狗狗图片时，我们只想遍历从 API 获取的每张狗狗图片并渲染这些图片。为此，我们可以创建一个 DogImages 组件，该组件通过 props 接收数据并渲染接收到的数据。

```vue
<!-- DogImages.vue -->
<template>
  <img
    v-for="(dog, index) in dogs"
    :src="dog"
    :key="index"
    alt="Dog"
  />
</template>

<script setup>
import { defineProps } from 'vue'
const { dogs } = defineProps(['dogs'])
</script>
```

DogImages 组件可以被视为表现组件。表现组件通常是无状态的：它们不包含自己的组件状态，除非出于 UI 目的需要状态。它们接收的数据不会被表现组件本身改变。表现组件的数据来自容器组件。

### 容器组件

容器组件的主要功能是将数据传递给其所包含的展示组件。除了关注数据的展示组件外，容器组件本身通常不会渲染任何其他组件。因为它们本身不渲染任何内容，因此通常也不包含任何样式。

在我们的例子中，我们希望将狗的图片传递给展示组件 DogImages。为了能够这样做，我们需要从外部 API 获取这些图片。我们需要创建一个容器组件来获取这些数据，并将这些数据传递给展示组件 DogImages 以在屏幕上显示它。我们将这个容器组件称为 DogImagesContainer。

将这两个组件结合在一起，使得将应用逻辑的处理与视图分离成为可能。这种分离有助于提高代码的可维护性和重用性。容器组件专注于数据获取和处理，而展示组件则专注于如何展示这些数据，从而保持代码的清晰和模块化。

DogImagesContainer.vue

```html
<template>
  <DogImages :dogs="dogs" />
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import DogImages from './DogImages.vue'

  const dogs = ref([])

  onMounted(async () => {
    const response = await fetch('https://dog.ceo/api/breed/labrador/images/random/6')
    const { message } = await response.json()
    dogs.value = message
  })
</script>
```

简而言之，这就是容器/展示模式。当与 Pinia 等状态管理解决方案集成时，容器组件可以被用来直接与存储交互，根据需要获取或更改状态。这使得展示组件能够保持纯粹且不了解更广泛的应用逻辑，只专注于根据接收到的属性渲染用户界面。
