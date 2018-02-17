import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

const Header = (props, { url, pathname }) => {
  const activeClass = routeUrl => cn('nav-link', {
    active: pathname === routeUrl
  });
  return (
    <ul className="nav nav-pills">
      <li className="nav-item">
        <a className={activeClass(url('home'))} href={url('home')}>Home</a>
      </li>
      <li className="nav-item">
        <a className={activeClass(url('weapons'))} href={url('weapons')}>Weapons</a>
      </li>
    </ul>
  );
};

Header.contextTypes = {
  url: PropTypes.func,
  pathname: PropTypes.string,
};

module.exports = Header;
