import React from 'react';
import {
  BrowserRouter, Route, Switch, NavLink,
} from 'react-router-dom';
import './App.scss';
import Wizard from './Wizard';


export default function App() {
  return (
    <BrowserRouter>
      <div className="container pt-10">
        <div>
          <NavLink exact to="/" activeClassName="active-link" className="mr-10">Home</NavLink>
          <NavLink to="/wizard" activeClassName="active-link">Wizard</NavLink>
        </div>

        <Switch>
          <Route exact path="/" render={() => (
            <h1>Welcome Back, Commander!</h1>
          )}/>
          <Route path="/wizard" component={Wizard} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
