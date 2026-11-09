# 组件

## 请结合一个组件库设计的过程,谈谈前端工程化的思想

当我们结合一个组件库设计的过程来谈论前端工程化的思想时，需要理清这些要点：

### 1. 使用 Lerna 进行多包管理：

通过 Lerna 来管理多个包（组件），实现组件级别的解耦、独立版本控制、按需加载等特性。

```bash
# 安装 Lerna
npm install -g lerna

# 初始化一个 Lerna 仓库
lerna init

# 创建 "Button" 组件包
lerna create button --yes
```

### 2. 规范化提交：

使用规范化的提交信息可以提高 Git 日志的可读性，并且可以通过 conventional commits 自动生成 CHANGELOG。可以使用 commitizen、commitlint 等工具来配置。

```bash
# 安装相关工具
npm install commitizen cz-conventional-changelog --save-dev
```

```json
// package.json
{
  "scripts": {
    "commit": "git-cz"
  },
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  }
}
```

### 3. 代码规范化：

通过 ESLint、Prettier 等工具实现代码规范化和格式化，并封装为自己的规范预设。

```bash
# 安装相关工具
npm install eslint prettier eslint-plugin-prettier eslint-config-prettier --save-dev

```

```js
// .eslintrc.js
module.exports = {
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
}

// .prettierrc.js
module.exports = {
  singleQuote: true,
  trailingComma: 'es5',
}
```

### 4. 组件开发调试：

需要考虑热更新编译、软链接引用等问题，以方便在开发过程中进行组件的调试

```jsx
// packages/button/src/Button.js
import React from 'react'

const Button = ({ type = 'primary', onClick, children }) => {
  return (
    <button
      className={`button ${type}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
```

### 5. 文档站点：

可以基于 dumi、vitePress 等搭建文档站点，并实现 CDN 加速、增量发布等优化

### 6. 单元测试：

需要考虑 jest、enzyme 等工具的配合使用，生成测试覆盖率报告

### 7. 按需加载：

需要配合 babel-plugin-import 实现按需加载，即在编译时修改导入路径来实现组件的按需加载

### 8. 组件设计：

需要考虑响应式、主题、国际化、TypeScript 支持等问题，以保证组件的灵活性和可扩展性。

### 9. 发布前的自动化脚本：

```json
// package.json
{
  "scripts": {
    "prepublish": "npm run lint && npm run test",
    "lint": "eslint .",
    "test": "jest"
  }
}
```

需要编写自动化脚本来规范发布流程，确保发布的一致性和可靠性

### 10. 发布后的处理：

考虑补丁升级、文档站点同步发布等问题，以便及时修复问题并提供最新的文档。

### 11. 制定 Contributing 文档：

制定 Contributing 文档可以降低开源社区贡献的门槛，并确保社区成员了解如何参与项目。处理 issues 和 PR 需要有专人负责。

## 如何对一个组件库进行测试？

> 首先需要明确，组件库的测试大致可以分为两类：一类是针对组件本身的功能和性能的测试（例如，单元测试、性能测试），另一类是针对组件在集成环境下的行为和性能的测试（例如，集成测试、系统测试）

### 1. 功能测试（单元测试）

通常来说，组件的功能测试可以通过单元测试来完成。单元测试的目的是验证组件的单个功能是否按照预期工作。这通常可以通过编写测试用例来完成，每个测试用例针对一个特定的功能。

```js
import { Button } from '../src/Button'

test('Button should do something', () => {
  const component = new YourComponent()
  // your test logic here
  expect(component.doSomething()).toBe('expected result')
})
```

### 2. 边界测试

边界测试是一种特殊的功能测试，用于检查组件在输入或输出达到极限或边界条件时的行为。

```js
test('Button should handle boundary condition', () => {
  const component = new YourComponent()
  // test with boundary value
  expect(component.handleBoundaryCondition('boundary value')).toBe('expected result')
})
```

### 3. 响应测试

响应测试通常涉及到 UI 组件在不同的设备或屏幕尺寸下的行为。这可能需要使用端到端（E2E）测试工具，如 Puppeteer、Cypress 等。

```js
import { test } from '@playwright/test'

test('Button should be responsive', async ({ page }) => {
  await page.goto('http://localhost:3000/your-component')
  const component = await page.$('#your-component-id')
  expect(await component.isVisible()).toBe(true)

  // Simulate a mobile device
  await page.setViewportSize({ width: 375, height: 812 })
  // Check the component under this condition
  // your test logic here
})
```

### 4. 交互测试

交互测试也可以通过端到端（E2E）测试工具来完成。

```js
test('Button should handle interactions', async ({ page }) => {
  await page.goto('http://localhost:3000/your-component')
  const component = await page.$('#your-component-id')

  // Simulate a click event
  await component.click()
  // Check the result of the interaction
  // your test logic here
})
```

### 5. 异常测试

异常测试用于验证组件在遇到错误或非法输入时能否正确处理。这通常可以通过在测试用例中模拟错误条件来完成。

```js
test('Button should handle errors', () => {
  const component = new YourComponent()
  // Test with illegal argument
  expect(() => {
    component.doSomething('illegal argument')
  }).toThrow('Expected error message')
})
```

### 6. 性能测试

性能测试用于验证组件的性能，例如，加载速度、内存消耗等。

```js
import { performance } from 'perf_hooks'

test('Button should have good performance', () => {
  const start = performance.now()
  const component = new YourComponent()
  component.doSomething()
  const end = performance.now()
  const duration = end - start
  expect(duration).toBeLessThan(50) // Expect the operation to finish within 50 ms
})
```

### 7. 自动化测试

单元测试、集成测试和系统测试都可以通过自动化测试工具进行。例如，Jest 和 Mocha 可以用于自动化运行 JavaScript 单元测试，Puppeteer 和 Selenium 可以用于自动化运行端到端测试。

## 组件库的类型定义应该怎样设计？

> 组件库的类型定义设计取决于很多因素，包括库的大小、复杂度、可能的使用场景等。

### 1. 定义全局类型 versus 定义组件 Props 类型

在组件库中，我们经常需要定义一些可以在多个组件之间共享的全局类型，以及针对特定组件的 props 类型。例如：

```ts
// 全局类型
export interface Size {
  width: number
  height: number
}

// 组件Props类型
export interface ButtonProps {
  size?: Size
  label: string
  onClick?: () => void
}
```

### 2. 类型导出应该集中还是分散?

是否集中导出类型取决于组件库的大小和复杂度。对于小型库，可以在一个单独的文件中集中导出所有类型；对于大型库，可能需要将类型定义分散在各个组件文件中，然后在一个单独的文件中重新导出它们。例如：

```ts
// 在各个组件文件中定义和导出类型
// button.ts
export interface ButtonProps {
  /*...*/
}

// 在一个单独的文件中重新导出所有类型
// types.ts
export type { ButtonProps } from './button'
```

### 3. 如何设计类型层级关系？如何进行类型复用？

在设计类型时，应尽可能地利用 TypeScript 的类型系统来构建类型层级关系，并复用类型。例如，你可以使用类型交叉（&）和类型联合（|）来复用类型：

```ts
type SmallSize = { width: number; height: number }
type LargeSize = SmallSize & { depth: number }

type Size = SmallSize | LargeSize
```

### 4. 类型定义要充分还是精简？

类型定义应尽可能精简，同时提供足够的信息来描述类型的形状和行为。避免使用 any 或 unknown 类型，除非有特别的理由。例如：

```ts
// 不好的类型定义
interface ButtonProps {
  [key: string]: any // 这不提供任何有关props的信息
}

// 好的类型定义
interface ButtonProps {
  size?: Size
  label: string
  onClick?: () => void
}
```

总的来说，设计好的类型定义可以提高代码的可读性和可维护性，同时减少运行时错误。

## 组件库的渐进升级策略应该怎么设计？

> 组件库的渐进升级策略通常会涉及到版本控制、向下兼容性、废弃通知以及旧版本的兼容性等多个方面。这种策略的主要目的是在保持库的稳定性和功能性的同时，尽可能地减少对用户的影响。

### 1. 版本控制策略

组件库通常遵循语义化版本 (SemVer) 规范进行版本控制。在语义化版本中，每个版本号都由三部分组成：主版本号、次版本号和补丁版本号。
例如，版本号为 1.2.3 表示主版本号为 1，次版本号为 2，补丁版本号为 3。

- 主版本号（Major）: 当你做了不兼容的 API 修改
- 次版本号（Minor）: 当你做了向下兼容的功能性新增
- 补丁版本号（Patch）: 当你做了向下兼容的问题修复

### 2. 向下兼容处理

向下兼容性是指在升级组件库时，保证新版本不会破坏旧版本的功能。例如，如果新版本的一个组件删除了一个属性，而这个属性在旧版本中是必需的，那么这个变化就不是向下兼容的。
在进行不向下兼容的变化时，应在主版本号上进行增加，以警告用户可能需要修改他们的代码。

### 3. 功能被废弃怎么通知用户升级?

当一个功能或者组件被废弃时，应在库的文档、更新日志以及相关的 API 文档中明确注明。在代码中，可以通过添加警告或者错误信息来提醒用户：

```js
function deprecatedFunction() {
  console.warn(
    'Warning: deprecatedFunction is deprecated and will be removed in the next major version.'
  )
  // 功能的原始实现
}
```

### 4. 兼容旧版本的方案

兼容旧版本的策略取决于特定的需求和资源。一种常见的策略是在主版本升级后，继续维护旧版本的一个分支，以便在必要时进行修复和改进。例如，如果当前版本是 2.x.x，那么可以维护一个 1.x.x 的分支。
在实践中，以上的策略和方法可能需要根据具体的情况进行调整。一个好的渐进升级策略应能够平衡新功能的引入、旧功能的废弃以及向下兼容性的维护。

## 组件库的按需加载实现中存在哪些潜在问题，如何解决？

> 按需加载（也称为代码拆分）是现代前端开发中常见的一种优化手段，可以有效地减少应用的初始加载时间。对于组件库来说，它使用户只加载和使用他们真正需要的组件，而不是加载整个库。

- babel-plugin-import

Babel 插件: 使用如 babel-plugin-import 的 Babel 插件可以在编译时将导入整个库的语句转换为仅导入使用的组件

- tree-shaking

Webpack、Rollup 等工具都已经支持了 Tree shaking。在项目的配置中开启 Tree shaking，然后使用 ES Modules 的导入导出语法，即可实现按需加载。
但是在使用 Tree shaking 的时候，有一个需要特别注意的地方，就是“副作用（side effects）”。
有些模块的代码可能会在导入时执行一些副作用，例如改变全局变量、改变导入模块的状态等。这种情况下，即使模块中的部分导出没有被使用，由于其副作用，也不能被 Tree shaking 移除。否则，可能会导致程序运行出错。

## 样式如何实现真正的按需加载?避免样式重复打包?

<Image src="/09build/opt-css2.png" alt="样式按需加载1" />

<Image src="/09build/opt-css1.png" alt="样式按需加载2" />

### 样式和逻辑分离

这种方案中,组件的 CSS 和 JS 在代码层面上是分离的,开发时写在不同的文件里。在打包时生成独立的逻辑文件和样式文件。

优点:

适用面广,可以支持不同的框架和技术栈。
支持 SSR,样式处理留给使用者。
可以直接提供源码,便于主题定制。

缺点:

使用时需要分别引入逻辑和样式,按需加载实现复杂，需要借助 babel-plugin-import、unplugin-vue-components 等。
样式文件打包可能存在冗余。

适合需要高适用性和灵活性的组件库。

### 样式和逻辑结合

这种方案将 CSS 和 JS 打包在一起,输出单一的 JS 文件。主要有两种实现形式:

1. CSS in JS:样式以对象或字符串形式存在在 JS 中。
2. 将 CSS 打包进 JS:通过构建工具,将 CSS 文件内容注入到 JS 中。

优点:

使用简单,只需要引入 JS 即可。
天然支持按需加载。

缺点:

需要额外的 runtime,可能影响性能。
难以利用浏览器缓存。
SSR 需要框架额外支持。

### 样式和逻辑关联

这种方案下,虽然 CSS 和 JS 在源码层分离,但组件内会直接引用样式,且输出文件中保留 import 语句。

优点:

- 使用简单,只引入 JS 即可。
- 支持按需加载。

缺点:

- 对构建和 SSR 都有一定要求。
- 样式编译复杂。

## 设计一个组件库的 CI/CD 和发布流程

可以参考antd。当你设计一个组件库的 CI/CD 和发布流程时，可以考虑以下步骤：

1. 分支管理：
   
开发者在开发新特性或修复 bug 时，应该在新的分支（通常称为 feature 分支）上进行开发。完成开发后，提交一个 pull request 到 main 或 master 分支，并进行代码审查。

2. 代码检查：
   
使用如 ESLint、Stylelint 等工具进行代码检查，使用 Jest 等工具进行单元测试和覆盖率检查。这些步骤可以在提交代码时或者 pull request 的过程中自动进行。

并在 CI/CD 工具中（如 GitHub Actions、Jenkins 等）配置相应的任务

3. 版本管理：
   
在合并代码并发布新版本前，需要确认新的版本号，并生成相应的 changelog。可以使用如 standard-version 这样的工具自动化这个过程。

4. 构建：
   
使用如 Webpack、Rollup 等工具进行构建，生成可以在不同环境（如浏览器、Node.js）下使用的代码。

5. 发布：
   
将构建好的代码发布到 npm，同时更新文档网站。

6. 部署：
   
部署到github pages或者自建服务

## 参考

<https://juejin.cn/post/7261080561480089655?searchId=202408141952589A792F0A002594D196FE>
