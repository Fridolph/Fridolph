先来看下 async-validator 库（下文简称 av - ovo）的 index.js

```js
// 引入相关依赖
import { format, complementError, asyncMap, warning, deepMerge } from './util';
import validators from './validator/';
import { messages as defaultMessages, newMessages } from './messages';

// 构造函数 Schema
function Schema(descriptor) {
  this.rules = null;
  this._messages = defaultMessages;
  this.define(descriptor);
  // 实例生成后会执行以上
}

// 定义一些原型方法（通过new Schema()生成的实例可以直接用了）
Schema.prototype = {
  messages(messages) {
    if (messages) {
      this._messages = deepMerge(newMessages(), messages);
    }
    return this._messages;
  },

  define(rules) {
    if (!rules) {
      throw new Error('Cannot configure a schema with no rules');
    }
    if (typeof rules !== 'object' || Array.isArray(rules)) {
      throw new Error('Rules must be an object');
    }
    this.rules = {};
    let z;
    let item;
    for (z in rules) {
      if (rules.hasOwnProperty(z)) {
        item = rules[z];
        this.rules[z] = Array.isArray(item) ? item : [item];
      }
    }
  },

  validate(source_, o = {}, oc) {
    let source = source_;
    let options = o;
    let callback = oc;
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    if (!this.rules || Object.keys(this.rules).length === 0) {
      if (callback) {
        callback();
      }
      return;
    }
    function complete(results) {
      let i;
      let field;
      let errors = [];
      let fields = {};

      function add(e) {
        if (Array.isArray(e)) {
          errors = errors.concat.apply(errors, e);
        } else {
          errors.push(e);
        }
      }

      for (i = 0; i < results.length; i++) {
        add(results[i]);
      }
      if (!errors.length) {
        errors = null;
        fields = null;
      } else {
        for (i = 0; i < errors.length; i++) {
          field = errors[i].field;
          fields[field] = fields[field] || [];
          fields[field].push(errors[i]);
        }
      }
      callback(errors, fields);
    }

    if (options.messages) {
      let messages = this.messages();
      if (messages === defaultMessages) {
        messages = newMessages();
      }
      deepMerge(messages, options.messages);
      options.messages = messages;
    } else {
      options.messages = this.messages();
    }
    let arr;
    let value;
    const series = {};
    const keys = options.keys || Object.keys(this.rules);
    keys.forEach(z => {
      arr = this.rules[z];
      value = source[z];
      arr.forEach(r => {
        let rule = r;
        if (typeof rule.transform === 'function') {
          if (source === source_) {
            source = { ...source };
          }
          value = source[z] = rule.transform(value);
        }
        if (typeof rule === 'function') {
          rule = {
            validator: rule,
          };
        } else {
          rule = { ...rule };
        }
        rule.validator = this.getValidationMethod(rule);
        rule.field = z;
        rule.fullField = rule.fullField || z;
        rule.type = this.getType(rule);
        if (!rule.validator) {
          return;
        }
        series[z] = series[z] || [];
        series[z].push({
          rule,
          value,
          source,
          field: z,
        });
      });
    });
    const errorFields = {};
    asyncMap(
      series,
      options,
      (data, doIt) => {
        const rule = data.rule;
        let deep =
          (rule.type === 'object' || rule.type === 'array') &&
          (typeof rule.fields === 'object' || typeof rule.defaultField === 'object');
        deep = deep && (rule.required || (!rule.required && data.value));
        rule.field = data.field;
        function addFullfield(key, schema) {
          return {
            ...schema,
            fullField: `${rule.fullField}.${key}`,
          };
        }

        function cb(e = []) {
          let errors = e;
          if (!Array.isArray(errors)) {
            errors = [errors];
          }
          if (errors.length) {
            Schema.warning('async-validator:', errors);
          }
          if (errors.length && rule.message) {
            errors = [].concat(rule.message);
          }

          errors = errors.map(complementError(rule));

          if (options.first && errors.length) {
            errorFields[rule.field] = 1;
            return doIt(errors);
          }
          if (!deep) {
            doIt(errors);
          } else {
            // if rule is required but the target object
            // does not exist fail at the rule level and don't
            // go deeper
            if (rule.required && !data.value) {
              if (rule.message) {
                errors = [].concat(rule.message).map(complementError(rule));
              } else if (options.error) {
                errors = [options.error(rule, format(options.messages.required, rule.field))];
              } else {
                errors = [];
              }
              return doIt(errors);
            }

            let fieldsSchema = {};
            if (rule.defaultField) {
              for (const k in data.value) {
                if (data.value.hasOwnProperty(k)) {
                  fieldsSchema[k] = rule.defaultField;
                }
              }
            }
            fieldsSchema = {
              ...fieldsSchema,
              ...data.rule.fields,
            };
            for (const f in fieldsSchema) {
              if (fieldsSchema.hasOwnProperty(f)) {
                const fieldSchema = Array.isArray(fieldsSchema[f])
                  ? fieldsSchema[f]
                  : [fieldsSchema[f]];
                fieldsSchema[f] = fieldSchema.map(addFullfield.bind(null, f));
              }
            }
            const schema = new Schema(fieldsSchema);
            schema.messages(options.messages);
            if (data.rule.options) {
              data.rule.options.messages = options.messages;
              data.rule.options.error = options.error;
            }
            schema.validate(data.value, data.rule.options || options, errs => {
              doIt(errs && errs.length ? errors.concat(errs) : errs);
            });
          }
        }

        const res = rule.validator(rule, data.value, cb, data.source, options);
        if (res && res.then) {
          res.then(() => cb(), e => cb(e));
        }
      },
      results => {
        complete(results);
      },
    );
  },

  getType(rule) {
    if (rule.type === undefined && rule.pattern instanceof RegExp) {
      rule.type = 'pattern';
    }
    if (
      typeof rule.validator !== 'function' &&
      (rule.type && !validators.hasOwnProperty(rule.type))
    ) {
      throw new Error(format('Unknown rule type %s', rule.type));
    }
    return rule.type || 'string';
  },

  getValidationMethod(rule) {
    if (typeof rule.validator === 'function') {
      return rule.validator;
    }
    const keys = Object.keys(rule);
    const messageIndex = keys.indexOf('message');
    if (messageIndex !== -1) {
      keys.splice(messageIndex, 1);
    }
    if (keys.length === 1 && keys[0] === 'required') {
      return validators.required;
    }
    return validators[this.getType(rule)] || false;
  },
};

// Schema的静态方法
Schema.register = function register(type, validator) {
  if (typeof validator !== 'function') {
    throw new Error('Cannot register a validator by type, validator is not a function');
  }
  // 核心逻辑就这一句，进行赋值
  validators[type] = validator;
};

Schema.warning = warning;

Schema.messages = defaultMessages;

export default Schema;
```

由以上代码可知 index.js 做了这么些事情：

1. 引入相关依赖；
2. 定义 Schema 构造函数；
3. 为 Schema 添加了一些原型方法和静态方法；
4. 将 Schema 作为默认值导出。

其中一些代码逻辑组织也看学习参考一下：

首先 format, complementError, asyncMap, warning, deepMerge 作为方法导入，这是一些常用到的公共方法，av 库进行了封装里进行了封装

validator/index.js 是类型验证方法的封装

messages 则是相关提示信息的默认展示封装（返回了一个对象）

---

那么我们按照代码的运行再来看下这些方法

```js
function Schema(descriptor) {
  this.rules = null;
  this._messages = defaultMessages;
  this.define(descriptor);
  // 实例生成后会执行以上
}
```

用法就是我们要实例化一个 validator，并传入一个 descriptor 对象来描述如何进行验证等。Schema 实例的生成期间会设置一些默认值，并执行 this.define ，这是一个原型方法，我们来看看

```js
define(rules) {
  // 校验 - 必须传入规则
  if (!rules) {
    throw new Error('Cannot configure a schema with no rules');
  }
  // rules不是对象 或 为数组类型 则报错
  if (typeof rules !== 'object' || Array.isArray(rules)) {
    throw new Error('Rules must be an object');
  }
  this.rules = {};
  let z;
  let item;
  for (z in rules) {
    if (rules.hasOwnProperty(z)) {
      // for in对象遍历，rules[z] 拿到key 赋值给item
      item = rules[z];
      // 添加规则的赋值，将item进行数组封装（是数组就不管了）
      this.rules[z] = Array.isArray(item) ? item : [item];
    }
  }
}
```

这并没有完，要使用还需要对 new Schema 的实例再调用 validate 方法，于是我们在读读源码顺便做下分析：

```js
/**
 * @param {Object} source - 传入要验证的对象
 * @param {Object} o (options) 配置对象 可选
 * @param {Function} oc callback 回调函数，进行错误处理等
 */
validate(source_, o = {}, oc) {
  let source = source_;
  let options = o;
  let callback = oc;
  // 没传 o 时的处理(直接写回调)
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  // rules不为null 或 rules无规则时 如果有传callback则直接调用
  if (!this.rules || Object.keys(this.rules).length === 0) {
    if (callback) {
      callback();
    }
    return;
  }

  //
  function complete(results) {
    // ... asyncMap 才用到，后面再回来看这里
  }

  // 生成实例会执行 this._messages = defaultMessages; 这句
  // 我们只需关心是否传了用户自定义的messages
  if (options.messages) {
    let messages = this.messages();
    if (messages === defaultMessages) {
      messages = newMessages();
    }
    // 深克隆
    deepMerge(messages, options.messages);
    options.messages = messages;
  } else {
    options.messages = this.messages();
  }

  let arr;
  let value;
  const series = {};
  const keys = options.keys || Object.keys(this.rules);
  // 拿到所传rules 里的每一项 然后执行以下逻辑
  keys.forEach(z => {
    arr = this.rules[z];
    value = source[z];
    // 这一步可理解为 对单独的一项 进行校验
    arr.forEach(r => {
      let rule = r;
      if (typeof rule.transform === 'function') {
        if (source === source_) {
          source = { ...source };
        }
        value = source[z] = rule.transform(value);
      }
      if (typeof rule === 'function') {
        rule = {
          validator: rule,
        };
      } else {
        rule = { ...rule };
      }
      // 这里是将 验证的类型值 赋值给 rule.validator
      // getValidationMethod方法看后面 -----

      // ----- 然后再跳回来
      rule.validator = this.getValidationMethod(rule);
      rule.field = z;
      rule.fullField = rule.fullField || z;
      rule.type = this.getType(rule);
      if (!rule.validator) {
        return;
      }
      // series对象 缓存了当前的rule项 的内容
      series[z] = series[z] || [];
      series[z].push({
        rule,
        value,
        source,
        field: z,
      });
    });
  });

  const errorFields = {};
  asyncMap(
    // 最后再执行asyncMap方法就完成了整个validate的逻辑
    // ... 我们放到后面来分析
  )
}
```

getValidationMethod

```js
getValidationMethod(rule) {
  if (typeof rule.validator === 'function') {
    return rule.validator;
  }
  const keys = Object.keys(rule);
  const messageIndex = keys.indexOf('message');
  // 若rule对象里不包含 message，则将keys数组的末位去掉
  if (messageIndex !== -1) {
    keys.splice(messageIndex, 1);
  }
  // 若length长度为1，且 key值为required 则将 validators.required 返回
  if (keys.length === 1 && keys[0] === 'required') {
    return validators.required;
  }

  // 以上都未命中则返回 validators[this.getType(rule)] || false;
  return validators[this.getType(rule)] || false;
}
```

下面来看看 getType 的定义，其实就是返回类型的字符串值

```js
getType(rule) {
  if (rule.type === undefined && rule.pattern instanceof RegExp) {
    rule.type = 'pattern';
  }
  if (
    typeof rule.validator !== 'function' &&
    (rule.type && !validators.hasOwnProperty(rule.type))
  ) {
    throw new Error(format('Unknown rule type %s', rule.type));
  }
  return rule.type || 'string';
}
```

---

下面来看看 asyncMap 方法

```js
asyncMap(
    series,
    options,
    (data, doIt) => {
      const rule = data.rule;
      let deep =
        (rule.type === 'object' || rule.type === 'array') &&
        (typeof rule.fields === 'object' || typeof rule.defaultField === 'object');
      deep = deep && (rule.required || (!rule.required && data.value));
      rule.field = data.field;
      function addFullfield(key, schema) {
        return {
          ...schema,
          fullField: `${rule.fullField}.${key}`,
        };
      }

      function cb(e = []) {
        let errors = e;
        if (!Array.isArray(errors)) {
          errors = [errors];
        }
        if (errors.length) {
          Schema.warning('async-validator:', errors);
        }
        if (errors.length && rule.message) {
          errors = [].concat(rule.message);
        }

        errors = errors.map(complementError(rule));

        if (options.first && errors.length) {
          errorFields[rule.field] = 1;
          return doIt(errors);
        }
        if (!deep) {
          doIt(errors);
        } else {
          // if rule is required but the target object
          // does not exist fail at the rule level and don't
          // go deeper
          if (rule.required && !data.value) {
            if (rule.message) {
              errors = [].concat(rule.message).map(complementError(rule));
            } else if (options.error) {
              errors = [options.error(rule, format(options.messages.required, rule.field))];
            } else {
              errors = [];
            }
            return doIt(errors);
          }

          let fieldsSchema = {};
          if (rule.defaultField) {
            for (const k in data.value) {
              if (data.value.hasOwnProperty(k)) {
                fieldsSchema[k] = rule.defaultField;
              }
            }
          }
          fieldsSchema = {
            ...fieldsSchema,
            ...data.rule.fields,
          };
          for (const f in fieldsSchema) {
            if (fieldsSchema.hasOwnProperty(f)) {
              const fieldSchema = Array.isArray(fieldsSchema[f])
                ? fieldsSchema[f]
                : [fieldsSchema[f]];
              fieldsSchema[f] = fieldSchema.map(addFullfield.bind(null, f));
            }
          }
          const schema = new Schema(fieldsSchema);
          schema.messages(options.messages);
          if (data.rule.options) {
            data.rule.options.messages = options.messages;
            data.rule.options.error = options.error;
          }
          schema.validate(data.value, data.rule.options || options, errs => {
            doIt(errs && errs.length ? errors.concat(errs) : errs);
          });
        }
      }

      const res = rule.validator(rule, data.value, cb, data.source, options);
      if (res && res.then) {
        res.then(() => cb(), e => cb(e));
      }
    },
```
