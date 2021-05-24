import React from 'react';
import cn from 'classnames';
import { Formik, Field, Form } from 'formik';
import { useStore } from 'effector-react';
import s from './Todolist.module.scss';
import { asyncStates } from '../lib/utils';
import { filterStates } from './todolistSlice';
import Context from '../lib/context';
import type { IStore } from '../lib/types';

const Todolist = () => {
  const { actions, $todoList, $filterState, $filteredTodos } = React.useContext(Context) as IStore;
  const todoList = useStore($todoList);
  const filterState = useStore($filterState);
  const filteredTodos = useStore($filteredTodos);
  console.log({ todoList, filterState });

  React.useEffect(() => {
    if (todoList.status === asyncStates.idle) {
      actions.loadTodos(2000);
    }
  }, []);

  const filterButtonClass = filterButtonState =>
    cn(s.filterButton, {
      [s.filterButton_active]: filterButtonState === filterState,
    });
  const todoClass = todo =>
    cn('fa', 'mr-10', {
      'fa-check': todo.isCompleted,
      'fa-dove': !todo.isCompleted,
    });

  const onChangeFilter = filterButtonState => () => actions.changeFilter(filterButtonState);
  const onChangeTodoStatus = id => () => actions.changeTodoStatus(id);
  const onAddNewTodo = (values, fm) => {
    fm.resetForm();
    actions.addNewTodo(values.newTodoText);
  };
  const onDeleteTodo = id => () => actions.deleteTodo(id);

  return (
    <div>
      <h1>ToDo list App</h1>
      <div className="row">
        <div className="col-6">
          <Formik initialValues={{ newTodoText: '' }} onSubmit={onAddNewTodo}>
            <Form className="d-flex mb-20">
              <Field
                type="text"
                className="form-control form-control__inline mr-20"
                name="newTodoText"
              />
              <button className="btn btn-primary" type="submit">
                Add ToDo
              </button>
            </Form>
          </Formik>
          <div className="mb-15">
            {filteredTodos.map(todo => (
              <div key={todo.id} className="d-flex justify-content-between align-items-center">
                <div className={s.todoRow} onClick={onChangeTodoStatus(todo.id)}>
                  <i className={todoClass(todo)}></i>
                  <div>{todo.text}</div>
                </div>
                <i className={cn('fa fa-times', s.deleteTodo)} onClick={onDeleteTodo(todo.id)}></i>
              </div>
            ))}
          </div>
          <div className="mb-5">Count: {filteredTodos.length}</div>
          <div className="d-flex">
            <div
              className={cn(filterButtonClass(filterStates.all), 'mr-15')}
              onClick={onChangeFilter(filterStates.all)}
            >
              all
            </div>
            <div
              className={cn(filterButtonClass(filterStates.completed), 'mr-15')}
              onClick={onChangeFilter(filterStates.completed)}
            >
              completed
            </div>
            <div
              className={filterButtonClass(filterStates.incomplete)}
              onClick={onChangeFilter(filterStates.incomplete)}
            >
              incomplete
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todolist;
