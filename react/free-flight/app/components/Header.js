import './Header.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import WeatherGetter from './WeatherGetter';


function Header(props) {
  return (
    <div className="header">
      <Link className="header__title" to={{ pathname: '/' }}>
        Clever Title
      </Link>
      <div className="header__weather-getter">
        <WeatherGetter layout="inline" />
      </div>
    </div>
  );
}


export { Header as default };
