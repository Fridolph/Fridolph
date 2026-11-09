# Next.js & SSR 实战

> 以下问题考察 Next.js 和 SSR 在生产环境中的实际应用。

## 1. SSR / SSG / ISR 分别适合什么业务场景？

**场景**：新项目需要选择渲染策略，你如何根据业务需求做决策？

::: details

| 策略 | 渲染时机 | 数据新鲜度 | 首屏速度 | 适合场景 |
|------|---------|-----------|---------|---------|
| **SSG** | 构建时 | 低（重新构建才更新） | 极快 | 博客、文档、营销页 |
| **SSR** | 每次请求 | 实时 | 快 | 用户仪表盘、个性化页面 |
| **ISR** | 构建时 + 定时更新 | 中等（X 秒更新一次） | 快 | 商品列表、新闻首页 |
| **CSR** | 客户端 | 实时 | 慢 | 后台管理系统、需登录页面 |

**决策流程**：

```
数据需要 SEO 吗？
├── 不需要 → CSR
└── 需要
    ├── 数据实时变化？→ SSR
    ├── 数据几秒内可接受延迟？→ ISR
    └── 数据基本不变？→ SSG
```

**混合策略**：首页 SSG + ISR，搜索页 CSR，用户仪表盘 SSR——一个项目可以混用。
:::

## 2. Next.js App Router vs Pages Router 迁移最坑的是什么？

**场景**：从 Pages Router 迁移到 App Router，遇到了意料之外的问题。

::: details

**常见坑**：

1. **`router.query` 在 App Router 不可用**：改用 `useSearchParams()`（客户端）或 `searchParams` prop（服务端）
2. **`getServerSideProps` 消失了**：直接用 `async` 组件 + `fetch`
3. **Layout 不会自动保留状态**：App Router 的 Layout 在导航时保持挂载，但需要正确处理
4. **`next/head` → `metadata` API**：SEO 标签从组件改为导出 `metadata` 对象
5. **`_app.tsx` / `_document.tsx` → `layout.tsx`**：全局 Layout 取代
6. **`next/router` 部分 API 变化**：`router.events` 不再可用

**迁移策略**：
- 不要一次性迁移，利用 App Router 和 Pages Router 可共存
- 从简单的页面开始（如 About 页）
- 先迁移路由，再迁移数据获取，最后迁移 Layout
:::

## 3. Server Components 和 Client Components 边界如何划？

**场景**：团队成员不清楚哪些组件应该放服务端，哪些放客户端。

::: details

**判断原则**：

```
组件需要什么？
├── 只在服务端用的数据/DOM API？→ Server Component
├── 需要用户交互（onClick/useState/useEffect）？→ Client Component
├── 纯渲染、只依赖 props？→ Server Component
└── 使用了浏览器 API（localStorage/window）？→ Client Component
```

**技巧**：
- 尽可能多地使用 Server Components（默认）
- 只在需要交互时加 `'use client'`
- 把"客户端叶子"往下推——父层 Server Component 获取数据，传给 Client Component

```jsx
// ServerComponent.tsx（默认，无需 use client）
async function ProductPage({ id }) {
  const product = await db.product.findUnique({ where: { id } })
  return <ProductDetail product={product} />  // 数据从服务端传给客户端组件
}

// ProductDetail.tsx
'use client'
function ProductDetail({ product }) {
  const [quantity, setQuantity] = useState(1)
  return <button onClick={() => addToCart(product, quantity)}>加入购物车</button>
}
```
:::

## 4. Next.js API Routes 如何实现 JWT 认证 + 接口限流？

**场景**：设计一套 API 中间件，支持 JWT 验证和基于 IP 的频率限制。

::: details

```typescript
// middleware.ts (App Router 全局中间件)
import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(request) {
  // 接口限流（简化版，生产用 upstash/redis）
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1'
  // rateLimit.check(ip, 60, 10)  // 60秒内最多10次

  // JWT 验证（仅 API 路由）
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const token = request.headers.get('authorization')?.split(' ')[1]
    if (!token) {
      return NextResponse.json({ error: '未登录' }, { status: 401 })
    }

    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
      )
      // 将用户信息传递给后续处理
      const headers = new Headers(request.headers)
      headers.set('x-user-id', payload.sub)
      return NextResponse.next({ headers })
    } catch {
      return NextResponse.json({ error: 'Token 无效' }, { status: 401 })
    }
  }
}

export const config = {
  matcher: '/api/:path*',  // 只匹配 API 路由
}
```

**生产建议**：JWT 短有效期（15min）+ refresh token；限流用 Redis sliding window；敏感操作加二次验证。
:::

## 5. next/image 与 CDN 的生产优化策略

**场景**：产品页面大量图片，首屏加载慢。如何用 next/image 配合 CDN 优化？

::: details

**next/image 自动做的事**：
1. 懒加载（默认 loading="lazy"，首屏用 "eager"）
2. 按需生成多种尺寸（WebP/AVIF）
3. 防止 layout shift（自动计算宽高）

**最佳配置**：

```jsx
<Image
  src="/product/hero.jpg"
  width={800}
  height={600}
  priority           // 首屏关键图片，禁用懒加载
  sizes="(max-width: 768px) 100vw, 50vw"
  quality={85}       // 压缩质量，75-85 体验接近无损
  alt="产品展示"
/>
```

**CDN 配合策略**：

```js
// next.config.js
module.exports = {
  images: {
    loader: 'custom',
    loaderFile: './lib/imageLoader.js',
    domains: ['cdn.example.com'],
    formats: ['image/avif', 'image/webp'],  // 优先 AVIF
  },
}
```

**决策**：
- 静态资源（Logo、图标等）→ CDN + 长缓存
- 用户上传图片 → CDN + 短缓存 + 按需处理
- 首屏 Hero 图 → priority + eager + preload + WebP/AVIF
:::

> 参考：Next.js 官方文档，web.dev
