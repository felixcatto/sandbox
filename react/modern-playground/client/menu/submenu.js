import React from 'react';
import routes from '../lib/routes';
import { NavLink } from '../lib/utils';

const Submenu = () => (
  <div className="d-flex mb-20">
    <NavLink to={routes.menu.xstate}>XState</NavLink>
    <NavLink to={routes.menu.reactState}>React State</NavLink>
  </div>
);

export default Submenu;
