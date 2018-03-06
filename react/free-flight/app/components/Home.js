import './Home.scss'
import React from 'react';
import WeatherGetter from './WeatherGetter';


function Home(props) {
  return (
    <div className="content">
      <div className="container content__flex-container">
        <p className="content__title">Enter a City and State</p>
        <div className="text-center">
          <WeatherGetter layout="block" />
        </div>
      </div>
    </div>
  );
}


export { Home as default };
