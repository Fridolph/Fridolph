# scroll-snap-type

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/scroll-snap-type>

CSS 属性 scroll-snap-type 设置了在有滚动容器的情形下吸附至吸附点的严格程度。

- none 在滚动此滚动容器的可见视口时，必须忽略吸附点。

- x 滚动容器仅在其横轴上吸附至吸附位置。

- y 滚动容器仅在其纵轴上吸附至吸附位置。

- block 滚动容器仅在其块向轴上吸附至吸附位置。

- inline 滚动容器仅在其行向轴上吸附至吸附位置。

- both 滚动容器在其两轴上独立地吸附至吸附位置（可能在各轴上吸附至不同的元素）。

- mandatory 若滚动容器当前未在滚动，则其可见视口必须吸附至吸附位置。

- proximity 若滚动容器当前未在滚动，则其可见视口可以吸附至吸附位置。是否吸附由用户代理根据滚动参数决定。若指定了吸附轴，则此为默认的吸附程度。

> 备注： 若吸附口中的内容发生变动（如被添加、移动、删除或改变尺寸）或者与滚动吸附相关的任意属性（如 scroll-snap-type 或 scroll-margin）的值发生变化，则滚动容器将按照 scroll-snap-type 最新的值重新吸附。

## Scroll Snap Type

<https://www.tailwindcss.cn/docs/scroll-snap-type>

| Class          | Properties                                               |
| -------------- | -------------------------------------------------------- |
| snap-none      | scroll-snap-type: none;                                  |
| snap-x         | scroll-snap-type: x var(--tw-scroll-snap-strictness);    |
| snap-y         | scroll-snap-type: y var(--tw-scroll-snap-strictness);    |
| snap-both      | scroll-snap-type: both var(--tw-scroll-snap-strictness); |
| snap-mandatory | --tw-scroll-snap-strictness: mandatory;                  |
| snap-proximity | --tw-scroll-snap-strictness: proximity;                  |
