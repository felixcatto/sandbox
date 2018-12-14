import React from 'react';
import Header from './header';


// eslint-disable-next-line
export default ({ children }) => (
  <React.Fragment>
    <Header/>
    {children}
  </React.Fragment>
);
