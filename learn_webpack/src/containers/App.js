import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from '../actions'
import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';
import Footer from '../components/Footer';

export default class App extends Component {
  render() {
    // 通过调用 connect() 注入
    const { dispatch, visibleTodos, visibilityFilter }= this.props;

    return (
      <div>
        <AddTodo  
          onAddClick={ text =>
            // console.log('add todo', text);
            dispatch(addTodo(text))
          }
        />
        <TodoList 
          {/*todos={[
            {
              text: 'Use Redux',
              completed: true
            },
            {
              text: 'Learn to connect it to React',
              completed: false
            }
          ]}*/}
          <TodoList 
            todos={this.props.visibleTodos}
            onTodoClick={ index =>
              dispatch(completeTodo(index))
            } 
          />

          {/*onTodoClick={ todo => 
            console.log('todo clicked', todo) 
          }}*/}
          <Footer
            filter={visibilityFilter}
            onFilterChange={nextFilter => 
              dispatch(setVisibilityFilter(nextFilter))
            }
          />
        />
      </div>
    )
  }
}

App.propTypes = {
  visibleTodos: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  })),
  visibilityFilter: propTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE'
  ]).isRequired
}

function selectTodos(todos, filter) {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos;

    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(todo => todo.completed);

    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed);
  }
}

// 基于全局 state , 哪些是我们想注入的 props ?
// 注意： 使用 https://github.com/reactjs/reselect 效果更佳

function select(state) {
  return {
    visibleTodos: selectTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter
  }
}

// 包装 component ，注入 dispatch 和 state 到其默认的connect(select)(app)中;
export default connect(select)(App);