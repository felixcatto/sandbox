import React from 'react';
import ReactDOM from 'react-dom';

// Slomux - реализация Flux, в которой, как следует из нвазвания, что-то сломано.
// Нужно выяснить что здесь сломано


const createStore = (reducer, initialState) => {
  let currentState = initialState
  const listeners = []

  const getState = () => currentState
  const dispatch = action => {
    currentState = reducer(currentState, action)
    listeners.forEach(listener => listener())
  }

  const subscribe = listener => listeners.push(listener)

  return { getState, dispatch, subscribe }
}

// Заменил window.store на context API
const Context = React.createContext();

class InnerConnect extends React.Component {
  componentDidMount() {
    const { store } = this.props;
    store.subscribe(() => this.forceUpdate());
  }

  render() {
    return this.props.children();
  }
}

// Заменил window.store на context API
const connect = (mapStateToProps, mapDispatchToProps) => Component => ownProps => (
  <Context.Consumer>
    {store =>
      <InnerConnect store={store}>
        {() => (
          <Component
            {...ownProps}
            {...mapStateToProps(store.getState(), ownProps)}
            {...mapDispatchToProps(store.dispatch, ownProps)}
          />
        )}
      </InnerConnect>
    }
  </Context.Consumer>
)

const Provider = props => (
  <Context.Provider value={props.store}>
    {props.children}
  </Context.Provider>
)

const ADD_TODO = 'ADD_TODO'

const addTodo = todo => ({
  type: ADD_TODO,
  payload: todo,
})

// заменил стейт с [] на {}, вроде это стандарт в редаксе, что стейт должен быть обьектом. Довольно удобный стандарт.
const reducer = (state = {}, { type, payload: todo }) => {
  switch(type) {
    case ADD_TODO:
      // Одно из правил редакса "Changes are made with pure functions"
      // push мутирует стейт, вариант ниже - нет
      return {
        ...state,
        todos: [...state.todos, todo],
      };
    default:
      return state
  }
}

class ToDoComponent extends React.Component {
  state = {
    todoText: ''
  }

  render() {
    return (
      <div>
        <label>{this.props.title || 'Без названия'}</label>
        <div>
          <input
            value={this.state.todoText}
            placeholder="Название задачи"
            onChange={this.updateText}
          />
          <button onClick={this.addTodo}>Добавить</button>
          <ul>
            {/* Реакт требует наличие уникального key на элементе массива,
              для более эффективного ререндера
            */}
            {this.props.todos.map((todo, idx) => <li key={idx}>{todo}</li>)}
          </ul>
        </div>
      </div>
    )
  }

  // заменил функции на стрелочные, чтобы они не теряли this, когда их в onClick передаешь
  // заменил мутирование стейта на функцию setState.
  updateText = (e) => {
    const { value } = e.target;
    this.setState({ todoText: value });
  }

  addTodo = () => {
    this.props.addTodo(this.state.todoText)
    this.setState({ todoText: '' });
  }
}

// Прокинул собсвенные пропсы компонента
const ToDo = connect((state, ownProps) => ({
  ...ownProps,
  todos: state.todos,
}), dispatch => ({
  addTodo: text => dispatch(addTodo(text)),
}))(ToDoComponent)

ReactDOM.render(
  <Provider store={createStore(reducer, { todos: [] })}>
    <ToDo title="Список задач"/>
  </Provider>,
  document.getElementById('app')
)