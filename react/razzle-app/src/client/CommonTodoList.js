import React, { useEffect } from 'react';
import cn from 'classnames';
import { Formik, Field, Form } from 'formik';
import s from './CommonTodoList.module.scss';
import { SpinnerSvg } from './svgIcons';
import { filterStates, asyncStates } from './lib/utils';

const CommonTodoList = props => {
  const {
    filterState,
    todoListState,
    todoList,
    loadTodos,
    changeFilter,
    changeTodoStatus,
    addNewTodo,
  } = props;

  useEffect(() => {
    if (todoListState === asyncStates.idle) {
      loadTodos(2000);
    }
  }, []);

  let filterTodoFunc;
  if (filterState === filterStates.all) {
    filterTodoFunc = () => true;
  } else if (filterState === filterStates.incomplete) {
    filterTodoFunc = todo => !todo.isCompleted;
  } else if (filterState === filterStates.completed) {
    filterTodoFunc = todo => todo.isCompleted;
  }
  const filteredTodos = todoList.filter(filterTodoFunc);
  const todoItemsCount = filteredTodos.length;

  const filterButtonClass = filterButtonState =>
    cn(s.filterButton, {
      [s.filterButton_active]: filterButtonState === filterState,
    });
  const todoClass = todo =>
    cn('fa', 'mr-10', {
      'fa-check': todo.isCompleted,
      'fa-dove': !todo.isCompleted,
    });

  const onChangeFilter = filterButtonState => () => changeFilter(filterButtonState);
  const onChangeTodoStatus = id => () => changeTodoStatus(id);
  const onAddNewTodo = (values, fm) => {
    fm.resetForm();
    addNewTodo(values.newTodoText);
  };

  return (
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
          {todoListState === asyncStates.pending ? (
            <SpinnerSvg modifier="bold" />
          ) : (
            filteredTodos.map(todo => (
              <div key={todo.id}>
                <div className={s.todoRow} onClick={onChangeTodoStatus(todo.id)}>
                  <i className={todoClass(todo)}></i>
                  <div>{todo.text}</div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="mb-5">Count: {todoItemsCount}</div>
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
  );
};

export default CommonTodoList;
