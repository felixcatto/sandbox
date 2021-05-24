import { Store } from 'effector';
import { ITodoList, I$TodoList, I$FilterState, ITodoListActions } from '../components/todolistSlice';

export type IStore = {
  $todoList: I$TodoList;
  $filterState: I$FilterState;
  $filteredTodos: Store<ITodoList>;
  actions: ITodoListActions;
};
