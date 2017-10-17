// Element UI 
// util.js
import Vue from 'vue'
import Element from 'main/index'

Vue.use(Element)

let id = 0

const createElem = function() {
  const elem = document.createElement('div')

  elem.id = 'app' + ++id;
  document.body.appendChild(elem)

  return elem
}

/**
 * 回收 vm
?c @param {Object} vm
 */
exports.destroyVM = function(vm) {
  vm.$el &&
  vm.$el.parentNode &&
  vm.$el.parentNode.removeChild(vm.$el)
}

/**
*c 创建一个Vue的实例对象
 * @param {Object|String} Compo 组件配置, 可直接传 template
 * @param {Boolean=false} mounted 是否添加到DOM上
 * @return {Object} vm
 */
exports.createVue = function(Compo, mounted = false) {
  if (Object.prototype.toString.call(Compo) === '[object String]') {
    Compo = { template: Compo }
  }
  return new Vue(Compo).$mount(mounted === false ? null : createElem())
}

/**
*c 创建一个测试组件实例
 * @link http://vuejs.org/guide/unit-testing.html#Writing-Testable-Components
 * @param {Object} Compo - 组件对象
 * @param {Object} propsData - props数据
 * @param {Boolean = false} mounted - 是否添加到DOM上
 * @return {Object} vm
 */
exports.createTest = function(Comp, propsData = {}, mounted = false) {
  if (propsData === true || propsData === false) {
    mounted = propsData
    propsData = {}
  }
  const elem = craeteElem()
  const Ctor = Vue.extend(Compo)
  return new Ctor({ propsData }).$mount(mounted === false ? null : elem)
}

/**
*c 触发一个事件
 * mouseenter, mouseleave, mouseover, keyup, change, click 等
 * @param {Element} elem
 * @param {String} name
 * @param {*} opts
 */
exports.triggerEvent = function(elem, name, ...opts) {
  let eventName

  if (/^mouse|click/.test(name)) {
    eventName = 'MouseEvents'
  } else if (/^key/.test(name)) {
    eventName = 'KeyboardEvent'
  } else {
    eventName = 'HTMLEvents'
  }
  const evt = document.createEvent(eventName)

  evt.initEvent(name, ...opts)

  elem.dispatchEvent ? elem.dispatchEvent(evt) : elem.fireEvent('on' + name, evt)

  return elem
}

/**
*c 触发 mouseup 和 mousedown 事件
 * @param {Element} elem
 * @param {*} opts
 */
exports.triggerClick = function(elem, ...opts) {
  exports.triggerEvent(elem, 'mousedown', ...opts)
  exports.triggerEvent(elem, 'mouseup', ...opts)

  return elem
}