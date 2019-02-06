import React from 'react';
import {
  BrowserRouter, Route, Switch, NavLink,
} from 'react-router-dom';
import GoatState from './GoatState';
import GoatReducer from './GoatReducer';
import GoatSDeclarativeMachine from './GoatSDeclarativeMachine';


const sleep = (ms, successRate = 0.66) => new Promise((resolve, reject) => {
  if (Math.random() < successRate) {
    setTimeout(resolve, ms);
  } else {
    setTimeout(reject, ms);
  }
});

const goatProps = {
  sleep,
  goatUrl: '/img/goat2.jpg',
};

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
          <Route path={`${matchUrl}/state`} render={() => (
            <GoatState {...goatProps} />
          )}/>
          <Route path={`${matchUrl}/reducer`} render={() => (
            <GoatReducer {...goatProps} />
          )}/>
          <Route path={`${matchUrl}/state-machine`} render={() => (
            <GoatSDeclarativeMachine {...goatProps} />
          )}/>
        </Switch>
      </div>
    </div>
  );
};

export default Goat;
