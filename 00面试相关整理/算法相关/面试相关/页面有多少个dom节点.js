// 页面共有多少个DOM节点
let total1 = document.querySelectorAll('*').length
let total2 = $$('*').length

// 那如果是求一个dom下的所有子孙节点数呢?
const getChild = node => {
  return Array.from(node.children)
    .reduce(
      (acc, cur) => cur.children.length
        ? acc.concat(cur, getChild(cur))
        : acc.concat(cur)
      , []
    ).length
}
