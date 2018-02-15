import React from 'react';

module.exports = (props) => {
  return (
    <div className="container">
      <ul className="nav">
        <li className="nav-item">
          <a className="nav-link active" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/weapons">Weapons</a>
        </li>
      </ul>
      <h2>Hello guys</h2>
      <p>
        Welcome to our new app. It has many cool features such as automatic gulp setup,
        written in es6 style, scss -> css pipeline, react templating. But this is 
        only beginning. In future we add posgress db and front-end interactive 
        components! Do not miss it :)
      </p>
    </div>
  );
}
