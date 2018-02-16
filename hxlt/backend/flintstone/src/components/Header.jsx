import React from 'react';
import app from '../app';

module.exports = () => {
  const url = app.namedRoutes.build.bind(app.namedRoutes);
  return (
    <ul className="nav">
      <li className="nav-item">
        <a className="nav-link active" href={url('home')}>Home</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href={url('weapons')}>Weapons</a>
      </li>
    </ul>
  );
}
