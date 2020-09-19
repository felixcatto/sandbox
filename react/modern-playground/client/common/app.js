import React from 'react';
import { Router, Link, Redirect } from '@reach/router';
import routes from '../lib/routes';
import { NavLink, PartialNavLink } from '../lib/utils';
import MenuXState from '../menu/menuXState';
import MenuReactState from '../menu/menuReactState';
import AlarmClock from '../alarmClock/index';

const Home = () => <img src="/img/fire-rain-gothic.jpg" className="app__splash-screen" />;

const App = () => (
  <div className="app__body">
    <div className="container app__container pt-20">
      <h1>
        <Link to={routes.root} className="app__root-link">
          Fire rain
        </Link>
      </h1>

      <div className="d-flex mb-20">
        <NavLink to={routes.root}>Home</NavLink>
        <PartialNavLink to={routes.menu.index}>Menu</PartialNavLink>
        <NavLink to={routes.alarmClock}>Alarm Clock</NavLink>
      </div>

      <Router>
        <Home path={routes.root} />
        <MenuXState path={routes.menu.xstate} />
        <MenuReactState path={routes.menu.reactState} />
        <AlarmClock path={routes.alarmClock} />
        <Redirect from={routes.menu.index} to={routes.menu.xstate} noThrow />
      </Router>
    </div>
  </div>
);

export default App;
