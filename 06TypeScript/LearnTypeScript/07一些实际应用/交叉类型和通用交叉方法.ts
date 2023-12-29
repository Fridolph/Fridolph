type O1 = {a: string, b: number}
type O2 = {c: number, d: string}

let o1: O1 = {a: 'ab', b: 333}
let o2: O2 = {c: 1, d: 'bcd'}

function getCrossType<T extends object, U extends object>(obj1: T, obj2: U): T & U {
  const result = {} as T & U
  // for (let k in obj1) result[k] = obj1[k]
  // 虽然报错，其实这段代码没问题，底层原因，需要用以下方式解决报错
  // for (let k in obj1) (result as any)[k] = obj1[k]
  // for (let k in obj2) (result as any)[k] = obj2[k]
  union(result, obj1)
  union(result, obj2)

  return result
}

// 两段for循环 有点重复，可以优化
function union(combine_obj: any, cur_obj: any) {
  for (let k in cur_obj) combine_obj[k] = cur_obj[k]
  return combine_obj
}

let newObj = getCrossType(o1, o2)
