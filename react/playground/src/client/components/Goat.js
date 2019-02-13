import React from 'react';
import {
  BrowserRouter, Route, Switch, NavLink,
} from 'react-router-dom';
import GoatState from './GoatState';
import GoatReducer from './GoatReducer';
import GoatSMachine from './GoatSMachine';
import GoatSDeclarativeMachine from './GoatSDeclarativeMachine';


const Goat = (props) => {
  const matchUrl = props.match.url; // eslint-disable-line

  return (
    <div>
      <div>
        <NavLink to={`${matchUrl}/state`} activeClassName="navlink_active" className="navlink">
          Goat State
        </NavLink>
        <NavLink to={`${matchUrl}/reducer`} activeClassName="navlink_active" className="navlink">
          Goat Reducer
        </NavLink>
        <NavLink to={`${matchUrl}/state-machine`} activeClassName="navlink_active" className="navlink">
          Goat State Machine
        </NavLink>
      </div>

      <div className="pt-15">
        <Switch>
          <Route exact path={matchUrl} render={() => (
            <h1>Welcome Back, Goat!</h1>
          )}/>
          <Route path={`${matchUrl}/state`} component={GoatState}/>
          <Route path={`${matchUrl}/reducer`} component={GoatReducer}/>
          <Route path={`${matchUrl}/state-machine`} component={GoatSDeclarativeMachine}/>
        </Switch>
      </div>
    </div>
  );
};

export default Goat;
