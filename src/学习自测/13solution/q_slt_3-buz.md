# 具体业务场景

## 虚拟列表的实现原理

背景：大量的渲染列表数据问题，将增加浏览器开销，导致页面卡顿等性能问题。因此可以使用虚拟列表

实现原理：

1. 通过传入组件每条数据的高度，计算整个列表的高度，从而得到滚动列表的总高度，并将总高度赋值给列表
2. 监听滚动事件，监听外层容器的滚动事件，并确定可视区域起止数据在总数据的索引值，这可以通过 scrollTop 来实现
3. 设置数据对应的元素，为每条数据设置一个绝对定位，其中 top 等于索引值乘以每条数据的高度
4. 考虑缓冲条数，为了避免滑动过快产生空白，可以设置缓冲条数：具体的，如果滚动到底部，可以只显示最后 N 条数据，如果滚动到顶部，可以只显示前 N 条数据
5. 综上，实现一个固定高度的虚拟列表

::: details

主要代码实现 -> 模版部分

showItemList 循环可视区域内的数据 + 缓冲区的数据

```vue
<template>
  <div
    class="virtual-wrap"
    ref="virtualWrap"
    :style="{ width: width + 'px', height: height + 'px' }"
    @scroll="handleScroll"
  >
    <div
      class="virtual-content"
      :style="{ height: totalEstimatedHeight + 'px' }"
    >
      <list-item
        v-for="(item, index) in showItemList"
        :key="item.dataIndex + index"
        :index="item.dataIndex"
        :data="item.data"
        :style="item.style"
        @onSizeChange="handleChangeSize"
      >
        <template #slot-scope="slotProps">
          <slot
            name="slot-scope"
            :slotProps="slotProps"
          ></slot>
        </template>
      </list-item>
    </div>
  </div>
</template>
```

获取需要渲染的数据：通过可视区域内的开始和结束索引，获取需要渲染的列表数据

```js
const getCurrentChildren = () => {
  // 重新计算高度
  estimatedHeight(props.itemEstimatedSize, props.itemCount)
  const [startIndex, endIndex] = getRangeToRender(props, scrollOffset.value)
  const items = []
  for (let i = startIndex; i <= endIndex; i++) {
    const item = getItemMetaData(i)
    const itemStyle = {
      position: 'absolute',
      height: item.size + 'px',
      width: '100%',
      top: item.offset + 'px',
    }
    items.push({
      style: itemStyle,
      data: props.data[i],
      dataIndex: i,
    })
  }

  showItemList.value = items
}
```

获取需要渲染的数据：

:::

## 图片懒加载的实现方式

图片懒加载可以延迟图片的加载，只有当图片即将进入视口范围时才进行加载，这样可加快页面加载事件，提高用户体验

为需要懒加载的图片设置占位符，并将未加载的图片路径保存在 data 属性中，以便在需要时进行加载。

```html
<div class="lazy-placeholder">
  <img
    class="lazy"
    data-src="path/to/image.jpg"
    alt="预览图"
  />
</div>
```

1. Intersection Observer API
2. 自定义监听器

::: details

```js
let observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersection) {
      const lazyImage = entry.target
      observer.unobserve(lazyImage)
    }
  })
})

const lazyImages = [...document.querySelectorAll('.lazy-image')]
lazyImages.forEach(image => {
  observer.observe(image)
})
```

:::

## 前端如何实现截图？

可以使用 HTML5 Canvas API 实现

::: details

1. ⾸先在⻚⾯中创建⼀个 Canvas 元素，并设置其宽⾼和样式。
2. 使⽤ Canvas API 在 Canvas 上绘制需要截图的内容，⽐如⻚⾯的某个区域、某个元素、图⽚等。
3. 调⽤ Canvas API 中的 toDataURL() ⽅法将 Canvas 转化为 base64 编码的图⽚数据。
4. 将 base64 编码的图⽚数据传递给后端进⾏处理或者直接在前端进⾏显⽰。

```js
const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')
const btn = document.querySelector('#btn')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

btn.addEventListener('click', () => {
  ctsx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(document.documentElement, 0, 0)
  const imgData = canvas.toDataURL('image/png')
})
```

:::

## JS 超过 Number 最大值的数如何处理

1. 第三方库： big.js 、decimal.js、bignumber.js 等
2. 使用 BigInt 类型：需在数值后买你添加 n 后缀来表示 BigInt 类型

## 使用同一个链接，如何实现 PC 打开 Web，手机打开 H5？

::: details

可以根据请求来源 User-Agent 来判断访问设备的类型，然后在服务端进行匹配，参考思路如下：

1. 根据 UA 判断设备类型。第三方库 如 ua-parse.js 等进行解析
2. 如果是移动设备，可以返回一个 H5 页面或数据接口
3. 如果是 PC 设备，可以返回一个 Web 应用页面或数据接口

:::

## 如何进行大文件上传

### 分片上传方案

::: details

- 大文件分片上传方案，大致过程和原理如下：

1. 把大文件进行分段，比如 200M 的文件，分为 2M
2. 发送到服务器携带一个标志，可暂用当前时间戳，用于标记一个完整的文件
3. 服务器接收到文件片段后，根据标志进行存储
4. 当所有片段都上传完毕后，再发送给服务端一个合并文件的请求
5. 服务端根据文件标识、类型、各分片顺序进行文件合并
6. 完成合并后，删除其他的分片文件

创建切片的参考代码：

```js
// 创建切片
function createChunk(file, size = 2 * 1024 * 1024) {
  const chunkList = []
  let cur = 0
  while (cur < file.size) {
    // 使用 slice() 进行切片
    chunks.push(file.slice(cur, cur + size))
    cur += size
  }
  return chunkList
}
```

上传切片的个关键的操作：

1. 数据处理。需要将切片的数据进行维护成一个包括该文件，文件名，切片名的对象，所以采用 FormData 对象来进行整理数据。FormData 对象用以将数据编译成键值对,可用于发送带键数据，通过调用它的 append()方法来添加字段，FormData.append()方法会将字段类型为数字类型的转换成字符串（字段类型可以是 Blob、File 或者字符串：如果它的字段类型不是 Blob 也不是 File，则会被转换成字符串类。

2. 并发请求。每一个切片都分别作为一个请求，只有当这 4 个切片都传输给后端了，即四个请求都成功发起，才上传成功，使用 Promise.all()保证所有的切片都已经传输给后端。

```ts
// 数据处理
async function uploadFile(list) {
  const requestList = list.map(({ file, fileName, index, chunkName }) => {
    // 创建表单类型数据
    const formData = new FormData()
    formData.append('file', file) // 该文件
    formData.append('fileName', fileName) // 文件名
    formData.append('chunkName', chunkName) // 切片名
    return { formData, index }
  })
    .map(({ formData, index }) => axiosRequest({
      method: 'post',
      url: 'http://localhost:3000/upload',//请求接口，要与后端一一一对应
      data: formData
    })).then(res => {
      // 显示每个切片的上传进度
      console.log(res)
      let p = document.createElement('p')
      p.innerHTML = `${list[index].chunkName}--${res.data.message}`
      document.getElementById('progress').appendChild(p)
    })

  // 保证所有欺骗都已经传输完毕
  await Promise.all(requestList)
}

// 请求函数
function axiosRequest({ method: 'post', url, data}) {
  return new Promise((resolve, reject) => {
    //设置请求头
    const config = {
      headers: 'Content-Type:application/x-www-form-urlencoded',
    }
    //默认是post请求，可更改
    axios[method](url, data, config).then(res => {
      resolve(res)
    })
  }
}

// 文件上传
upload.addEventListener('click', () => {
  const uploadList = chunkList.map(({file}, index) => ({
    file,
    size: file.size,
    percent: 0,
    chunkName: `${files.name}-${index}`,
    fileName: files.name,
    index
  }))
  // 发请求，调用函数
  uploadFile(uploadList)
})
```

后端代码省略，可参考原文

:::

### 大文件上传断点续传

断点续传的原理在于前端/服务端需要记住已上传的切片，这样下次上传就可以跳过之前已上传的部分，有两种方案实现记忆的功能：

- 前端使用 localStorage 记录已上传的切片 hash
- 服务端保存已上传的切片 hash，前端每次上传前向服务端获取已上传的切片

### 前端水印的方式

::: details

- 明水印 通过文本或图像覆盖，显示版权信息
  - DOM 覆盖 position: fixed
  - canvas 输出背景图
  - svg 实现背景图
  - 图片加水印
  - CSS 添加水印：设置 !important 混淆 CSS 外部 CSS 等等，核心为增加修改难度
- 暗水印 不直接显示在图像上，但通过在图像中隐藏相关信息，保护敏感信息及来源追踪
  - 水印信息系处理 -> 转为二进制数据
  - 源数据处理，根据特定规则进行调整
  - 将水印二进制数据插入到源数据中的指定位置，以某种方式嵌入到源数据中
  - 提取：提取水印需要使用特定的解密算法和提取秘钥

:::

## 参考

- [请你实现一个大文件上传和断点续传](https://juejin.cn/post/6844904046436843527?searchId=20240818165018E1897F3CED4194A12911#heading-16)
