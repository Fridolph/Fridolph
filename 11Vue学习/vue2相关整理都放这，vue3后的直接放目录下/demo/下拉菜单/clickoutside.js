Vue.directive('clickoutside', {
  bind(el, binding, vnode) {
    function documentHandler(e) {
      if (el.contains(e.target)) return false;
      if (binding.expression) binding.value(e);
    }

    el.__vueClickOutside__ = documentHandler;
    document.addEventListener('click', documentHandler);
  },
  unbind(el, binding) {
    document.removeEventListener('click', el.__vueClickOutside__);
    delete el.__vueClickOutside__;
  }
})

// 要在document绑定click事件，所以在bind钩子内声明了一个函数 documentHandler 并将它作为句柄绑定在document的click事件上
// documentHandler函数做了两个判断，第一个是判断点击的区域是否是指令所在的元素内部，若是，则跳出，不往下执行

// 第二个判断的是当前的指令v-clickoutside有没有写表达式，在该自定义指令中
// 表达式应该是一个函数，在过滤了内部元素后，点击外面任何区域应该执行用户表达式中的函数，
// 所以 binding.value() 就是用来执行当前上下文methods中指定的函数的