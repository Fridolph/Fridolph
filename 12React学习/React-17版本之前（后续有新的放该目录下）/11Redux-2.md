## 理解 Store

```jsx
const store = createStore(reducer);
```

### API

1. getState()
2. dispatch(action)
3. subscribe(listener)

## 理解 Actions

```jsx
const action = {
  type: 'ADD_TODO',
  payload: 'hello',
};
```

## 理解 reducer

```jsx
function todoApp(state = initialState, action) {
  switch (action.type) {
    case ADD_TOD0:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            text: action.text,
            completed: false,
          },
        ],
      };
    default:
      return state;
  }
}
```

---

## 工具函数

### combineReducers

```jsx
// reducer1
export default function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.text])
    default:
      return state
  }
}

// reducer2
export default function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

// combine
import {combineReducers} from 'redux'
import todos from './todos'
import counter from './counter'

export default combineReducers({
  todos,
  counter
})
```

### bindActionCreators

目的是减少冗余的模版代码

```jsx
// action1
function addTodoWithDispatch(text) {
  const action = {
    type: 'ADD_TODO',
    text,
  };
  dispatch(action);
}

// aciton2
dispatch(addTodo(text));
dispatch(completeTodo(index));

// bindActioncreators
const boundAddTodo = text => dispatch(addTodo(text));
const boundCompleteTodo = index => dispatch(completeTodo(index));
```

源码解析:

```jsx
function bindActionCreator(actionCreator, dispatch) {
  return function() {
    return dispatch(actionCreator.apply(this, arguments))
  }
}

function bindActionCreators(actionCreators, dispatch) {
  const keys = Object.keys(actionCreators)
  const boundActionCreators = {}
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const actionCreator = actionCreators[key]
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
    }
  }
  return boundActionCreators
}
```
