# Text Color

<https://www.tailwindcss.cn/docs/text-color>

## 用法

| Class            | Properties               |
| ---------------- | ------------------------ |
| text-inherit     | color: inherit;          |
| text-current     | color: currentColor;     |
| text-transparent | color: transparent;      |
| text-black       | color: rgb(0 0 0);       |
| text-white       | color: rgb(255 255 255); |
| text-slate-50    | color: rgb(248 250 252); |
| text-slate-100   | color: rgb(241 245 249); |
| text-slate-200   | color: rgb(226 232 240); |
| text-slate-300   | color: rgb(203 213 225); |
| text-slate-400   | color: rgb(148 163 184); |
| text-slate-500   | color: rgb(100 116 139); |
| text-slate-600   | color: rgb(71 85 105);   |
| text-slate-700   | color: rgb(51 65 85);    |
| text-slate-800   | color: rgb(30 41 59);    |
| text-slate-900   | color: rgb(15 23 42);    |
| text-slate-950   | color: rgb(2 6 23);      |
| text-gray-50     | color: rgb(249 250 251); |
| text-gray-100    | color: rgb(243 244 246); |
| text-gray-200    | color: rgb(229 231 235); |
| text-gray-300    | color: rgb(209 213 219); |
| text-gray-400    | color: rgb(156 163 175); |
| text-gray-500    | color: rgb(107 114 128); |
| text-gray-600    | color: rgb(75 85 99);    |
| text-gray-700    | color: rgb(55 65 81);    |
| text-gray-800    | color: rgb(31 41 55);    |
| text-gray-900    | color: rgb(17 24 39);    |
| text-gray-950    | color: rgb(3 7 18);      |

> 每种类别设定也是 从 50、100 一直到 950，由浅到深一般地，50 最浅，用作 hover 100 就合适了，500 基本为单词字面意义的颜色，再往上就很深了

| 名称             | 颜色类别                 | 备注      |
| ---------------- | ------------------------ | --------- |
| text-zinc-200    | color: rgb(228 228 231); | -         |
| text-zinc-700    | color: rgb(63 63 70);    | -         |
| text-neutral-200 | color: rgb(229 229 229); | 中性色    |
| text-neutral-700 | color: rgb(64 64 64);    | 中性色    |
| text-red-200     | color: rgb(254 202 202); | 浅红      |
| text-red-500     | color: rgb(239 68 68);   | 红        |
| text-orange-200  | color: rgb(254 215 170); | 浅橙      |
| text-orange-500  | color: rgb(249 115 22);  | 橙色      |
| text-amber-200   | color: rgb(253 230 138); | 琥珀 - 黄 |
| text-amber-500   | color: rgb(245 158 11);  | 琥珀 - 黄 |
| text-yellow-200  | color: rgb(254 240 138); | 黄        |
| text-yellow-500  | color: rgb(234 179 8);   | 黄        |
| text-lime-200    | color: rgb(217 249 157); | 酸橙 - 绿 |
| text-lime-500    | color: rgb(132 204 22);  | 酸橙 - 绿 |
| text-green-200   | color: rgb(187 247 208); | 绿        |
| text-green-500   | color: rgb(34 197 94);   | 绿        |
| text-emerald-200 | color: rgb(167 243 208); | 翠绿      |
| text-emerald-500 | color: rgb(16 185 129);  | 翠绿      |
| text-teal-200    | color: rgb(153 246 228); | 青色      |
| text-teal-500    | color: rgb(20 184 166);  | 青色      |
| text-cyan-200    | color: rgb(165 243 252); | 青蓝      |
| text-cyan-500    | color: rgb(6 182 212);   | 青蓝      |
| text-sky-200     | color: rgb(186 230 253); | 天空蓝    |
| text-sky-500     | color: rgb(14 165 233);  | 天空蓝    |
| text-blue-200    | color: rgb(191 219 254); | 蓝        |
| text-blue-500    | color: rgb(59 130 246);  | 蓝        |
| text-indigo-200  | color: rgb(199 210 254); | 靛青      |
| text-indigo-500  | color: rgb(99 102 241);  | 靛青      |
| text-violet-200  | color: rgb(221 214 254); | 紫色      |
| text-violet-500  | color: rgb(139 92 246);  | 紫色      |
| text-purple-200  | color: rgb(233 213 255); | 紫色      |
| text-purple-500  | color: rgb(168 85 247);  | 紫色      |
| text-fuchsia-200 | color: rgb(245 208 254); | 紫红色    |
| text-fuchsia-500 | color: rgb(217 70 239);  | 紫红色    |
| text-pink-200    | color: rgb(251 207 232); | 粉色      |
| text-pink-500    | color: rgb(236 72 153);  | 粉色      |
| text-rose-200    | color: rgb(254 205 211); | 玫瑰红    |
| text-rose-500    | color: rgb(244 63 94);   | 玫瑰红    |

### 设置文本颜色

使用 text-{color} 实用程序控制元素的文本颜色。

```html
<p class="text-blue-600">The quick brown fox...</p>
```

### 改变不透明度

使用颜色不透明度修改器控制元素文本颜色的不透明度。

```html
<p class="text-blue-600/100">The quick brown fox...</p>
<p class="text-blue-600/75">The quick brown fox...</p>
<p class="text-blue-600/50">The quick brown fox...</p>
<p class="text-blue-600/25">The quick brown fox...</p>
<p class="text-blue-600/0">The quick brown fox...</p>
```

### 悬停、焦点和其他状态

Tailwind 允许您使用变体修饰符有条件地在不同状态下应用实用程序类。例如，使用hover:text-blue-600 仅在悬停时应用text-blue-600 实用程序。

```html
<p class="text-slate-500 hover:text-blue-600">The quick brown fox...</p>
```
