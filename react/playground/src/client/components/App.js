import React from 'react';
import {
  BrowserRouter, Route, Switch, NavLink,
} from 'react-router-dom';
import './App.scss';
import Wizard from './Wizard';
import Animation from './Animation';
import Chart from './Chart';


export default function App() {
  return (
    <BrowserRouter>
      <div className="container pt-10">
        <div>
          <NavLink exact to="/" activeClassName="navlink_active" className="navlink">
            Home
          </NavLink>
          <NavLink to="/wizard" activeClassName="navlink_active" className="navlink">
            Wizard
          </NavLink>
          <NavLink to="/animation" activeClassName="navlink_active" className="navlink">
            Animation
          </NavLink>
          <NavLink to="/chart" activeClassName="navlink_active" className="navlink">
            D3 chart
          </NavLink>
        </div>

        <Switch>
          <Route exact path="/" render={() => (
            <h1>Welcome Back, Commander!</h1>
          )}/>
          <Route path="/wizard" component={Wizard} />
          <Route path="/animation" component={Animation} />
          <Route path="/chart" component={Chart} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
