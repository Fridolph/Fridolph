<https://www.tailwindcss.cn/docs/hover-focus-and-other-states#first-last-odd-and-even>

# 处理悬停、焦点和其他状态

使用实用程序设置悬停、焦点等元素的样式。 Tailwind 中的每个实用程序类都可以通过在类名的开头添加一个修饰符来有条件地应用，该修饰符描述了您想要定位的条件。例如，要在悬停时应用 bg-sky-700 类，请使用 hover:bg-sky-700 类：

```html
<button class="bg-sky-500 hover:bg-sky-700 ...">Save changes</button>
```

当以传统方式编写 CSS 时，单个类名会根据当前状态执行不同的操作。

传统上，相同的类名在悬停时应用不同的样式

```css
.btn-primary {
  background-color: #0ea5e9;
}
.btn-primary:hover {
  background-color: #0369a1;
}
```

在 tailwind 中，您没有将悬停状态的样式添加到现有类中，而是将另一个类添加到只能在悬停上做某事的元素。在 tailwind 中，默认状态和悬停状态使用单独的类

```css
.bg-sky-500 {
  background-color: #0ea5e9;
}
.hover\:bg-sky-700:hover {
  background-color: #0369a1;
}
```

请注意，hover:bg-sky-700 如何仅定义 :hover 状态的样式？默认情况下它不执行任何操作，但只要将鼠标悬停在具有该类的元素上，背景颜色就会更改为 sky-700。这就是我们所说的实用程序类可以有条件地应用时的意思 - 通过使用修饰符，您可以精确控制设计在不同状态下的行为方式，而无需离开 HTML。

Tailwind 包含几乎所有您需要的修改器，包括：

- 伪类，例如 :hover、:focus、:first-child 和 :required
- 伪元素，例如 ::before、::after、::placeholder 和 ::selection
- 媒体和功能查询，例如响应式断点、深色模式和首选减少运动
- 属性选择器，例如 `[dir="rtl"]` 和 `[open]`

这些修改器甚至可以堆叠起来以针对更具体的情况，例如在黑暗模式下、在中等断点处、悬停时更改背景颜色：

```html
<button class="dark:md:hover:bg-fuchsia-600 ...">Save changes</button>
```

## 悬停、聚焦和活动

使用悬停、焦点和活动修饰符设置悬停、焦点和活动元素的样式：

```html
<button
  class="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 ..."
>
  Save changes
</button>
```

## 第一个、最后一个、奇数和偶数

```html
<ul role="list" class="p-6 divide-y divide-slate-200">
  {#each people as person}
  <!-- Remove top/bottom padding when first/last child -->
  <li class="flex py-4 first:pt-0 last:pb-0">
    <img class="h-10 w-10 rounded-full" src="{person.imageUrl}" alt="" />
    <div class="ml-3 overflow-hidden">
      <p class="text-sm font-medium text-slate-900">{person.name}</p>
      <p class="text-sm text-slate-500 truncate">{person.email}</p>
    </div>
  </li>
  {/each}
</ul>
```

## 表格状态

使用必需、无效和禁用等修饰符来设置不同状态下的表单元素的样式：

```html
<form>
  <label class="block">
    <span class="block text-sm font-medium text-slate-700">Username</span>
    <!-- Using form state modifiers, the classes can be identical for every input -->
    <input
      type="text"
      value="tbone"
      disabled
      class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "
    />
  </label>
  <!-- ... -->
</form>
```

对此类事情使用修饰符可以减少模板中的条件逻辑量，使您可以使用同一组类，无论输入处于什 ​​ 么状态，并让浏览器为您应用正确的样式。

Tailwind 还包括其他表单状态的修饰符，例如：只读、:不确定、:检查等等。

有关可用伪类修饰符的完整列表，请参阅伪类参考。基于父状态的样式（group-{modifier}）

当您需要根据某些父元素的状态设置元素的样式时，请使用 group 类标记父元素，并使用 group-\* 修饰符（如 group-hover）来设置目标元素的样式：
