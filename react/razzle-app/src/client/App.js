import React from 'react';
import { NavLink, Switch, Route, Link } from 'react-router-dom';
import TodoList from './TodoList';
import './App.scss';
import routes from './lib/routes';
import Context from './context';
import { actions, makeTodoList, makeFilterState } from './todolistSlice';

const Home = () => <img src="/img/v1.jpg" className="app__splash-screen" />;

const App = () => {
  const store = {
    actions,
    $todoList: makeTodoList(),
    $filterState: makeFilterState(),
  };

  return (
    <Context.Provider value={store}>
      <div className="container app__container pt-20">
        <div className="d-flex justify-content-between align-items-center mb-20">
          <h1>
            <Link to={routes.root} className="app__root-link">ToDo list App</Link>
          </h1>
        </div>

        <div className="d-flex mb-20">
          <NavLink to={routes.root} exact className="mr-20" activeClassName="app__nav-link_active">
            Home
          </NavLink>
          <NavLink to={routes.effector} activeClassName="app__nav-link_active">
            Effector
          </NavLink>
        </div>

        <Switch>
          <Route path={routes.root} exact>
            <Home />
          </Route>
          <Route path={routes.effector}>
            <TodoList />
          </Route>
        </Switch>
      </div>
    </Context.Provider>
  );
};

export default App;
