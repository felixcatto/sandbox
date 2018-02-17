import React from 'react';
import Header from './Header';


const Layout = (props) => {
  return (
    <div>
      <div className="container mb-20">
        <Header/>
      </div>
      {props.children}
    </div>
  );
};

module.exports = Layout;
