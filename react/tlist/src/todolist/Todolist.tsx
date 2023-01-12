import React from 'react';
import cn from 'classnames';
import s from './styles.module.scss';
import { useContext, getApiUrl, makeEnum } from '../lib/utils';
import { ITodo } from '../lib/types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../App';
import { login, logout } from '../lib/userSlice';

const Todolist = () => {
  const { axios } = useContext();
  const [todos, setTodos] = React.useState<ITodo[]>([]);
  const [newTodoText, setNewTodoText] = React.useState('');
  const filterStatuses = makeEnum('All', 'Completed', 'Incomplete');
  const [filterStatus, setFilterStatus] = React.useState(filterStatuses.All);
  const [editedTodoId, setEditedTodoId] = React.useState(null);
  const [editedTodoText, setEditedTodoText] = React.useState('');
  const editInputRef = React.useRef(null) as any;
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch() as any;

  const filteredTodos = todos.filter(el => {
    if (filterStatus === filterStatuses.All) {
      return true;
    } else if (filterStatus === filterStatuses.Completed) {
      return el.isCompleted;
    } else if (filterStatus === filterStatuses.Incomplete) {
      return !el.isCompleted;
    }
  });

  const filterButtonClass = filterButtonStatus =>
    cn(s.filterButton, {
      [s.filterButton_active]: filterStatus === filterButtonStatus,
    });
  const todoTextClass = isCompleted =>
    cn(s.todoText, {
      [s.todoText_completed]: isCompleted,
    });
  const todoCheckIconClass = isCompleted =>
    cn('fa fa_control  mr-5', {
      'fa-dove': isCompleted,
      'fa-check': !isCompleted,
    });
  const todoCheckIconTitle = isCompleted =>
    isCompleted ? 'Mark as Incomplete' : 'Mark as Completed';

  const onChangeFilterStatus = newFilterStatus => () => setFilterStatus(newFilterStatus);
  const updateTodos = async () => {
    const newTodos = await axios.get(getApiUrl('todos'));
    setTodos(newTodos);
  };
  const onTextChange = e => setNewTodoText(e.target.value);
  const onAddNewTodo = async () => {
    try {
      await axios.post(getApiUrl('todos'), {
        text: newTodoText,
        isCompleted: false,
      });
      await updateTodos();
      setNewTodoText('');
    } catch (e) {}
  };
  const onDeleteTodo = id => async () => {
    await axios.delete(getApiUrl('todo', { id }));
    await updateTodos();
  };
  const onChangeTodoStatus = (todo: ITodo) => async () => {
    await axios.put(getApiUrl('todo', { id: todo.id }), {
      ...todo,
      isCompleted: !todo.isCompleted,
    });
    await updateTodos();
  };
  const onSetTodoForEdit = (todo: ITodo) => () => {
    setEditedTodoId(todo.id);
    setEditedTodoText(todo.text);
  };
  const onCancelEditTodo = () => setEditedTodoId(null);
  const onEditTextChange = e => setEditedTodoText(e.target.value);
  const onSaveEditedTodo = todo => async () => {
    await axios.put(getApiUrl('todo', { id: todo.id }), {
      ...todo,
      text: editedTodoText,
    });
    await updateTodos();
    setEditedTodoId(null);
  };

  React.useEffect(() => {
    axios.get(getApiUrl('todos')).then(data => {
      console.log(data);
      setTodos(data);
    });
  }, []);

  React.useEffect(() => {
    if (!editedTodoId) return;
    editInputRef.current.focus();
  }, [editedTodoId]);

  return (
    <div className="container">
      <div className={s.headerRow}>
        <h2 className={s.header}>
          <div>Todolist</div>
          <div className={s.headerSuffix}>
            (again <i className="fa fa-smile"></i>)
          </div>
        </h2>
        <div className="d-flex items-center">
          <div>{user.username}</div>
          {user.isSignedIn ? (
            <i
              className="fa fa_control fa-sign-out-alt ml-10"
              title="Sign Out"
              onClick={() => dispatch(logout())}
            ></i>
          ) : (
            <i
              className="fa fa_control fa-sign-in-alt ml-10"
              title="Sign In"
              onClick={() => dispatch(login('1'))}
            ></i>
          )}
        </div>
      </div>
      <div className={s.inputRow}>
        <input
          type="text"
          className={cn('form-control', s.input)}
          onChange={onTextChange}
          value={newTodoText}
        />
        <div className="btn btn-primary ml-15" onClick={onAddNewTodo}>
          Add Todo
        </div>
      </div>
      <div className={s.todos}>
        {filteredTodos.map(todo => (
          <div className={s.todo} key={todo.id}>
            {editedTodoId === todo.id ? (
              <input
                type="text"
                className={s.editTodoInput}
                value={editedTodoText}
                onChange={onEditTextChange}
                ref={editInputRef}
              />
            ) : (
              <div className={todoTextClass(todo.isCompleted)}>{todo.text}</div>
            )}
            <div className="todoControls">
              {editedTodoId === todo.id ? (
                <div className="d-flex">
                  <div className="ilink mr-10" onClick={onCancelEditTodo}>
                    Cancel
                  </div>
                  <div className="ilink" onClick={onSaveEditedTodo(todo)}>
                    Save
                  </div>
                </div>
              ) : (
                <>
                  <i
                    className={todoCheckIconClass(todo.isCompleted)}
                    title={todoCheckIconTitle(todo.isCompleted)}
                    onClick={onChangeTodoStatus(todo)}
                  ></i>
                  <i
                    className="fa fa_control fa-edit mr-5"
                    title="Edit"
                    onClick={onSetTodoForEdit(todo)}
                  ></i>
                  <i
                    className="fa fa_control fa-trash-alt"
                    title="Delete"
                    onClick={onDeleteTodo(todo.id)}
                  ></i>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex">
        <div
          className={filterButtonClass(filterStatuses.All)}
          onClick={onChangeFilterStatus(filterStatuses.All)}
        >
          All
        </div>
        <div
          className={filterButtonClass(filterStatuses.Completed)}
          onClick={onChangeFilterStatus(filterStatuses.Completed)}
        >
          Completed
        </div>
        <div
          className={filterButtonClass(filterStatuses.Incomplete)}
          onClick={onChangeFilterStatus(filterStatuses.Incomplete)}
        >
          Incomplete
        </div>
      </div>
    </div>
  );
};

export default Todolist;
