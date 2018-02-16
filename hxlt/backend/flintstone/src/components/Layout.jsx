import React from 'react';
import Header from './Header';


module.exports = (props) => {
  return (
    <div>
      <div className="container">
        <Header/>
      </div>
      {props.children}
    </div>
  );
}
