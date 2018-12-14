import React, { useContext } from 'react';
import Context from '../../lib/context';


export default () => {
  const { urlFor } = useContext(Context);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-20">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a href={urlFor('root')} className="nav-link">Home</a>
              </li>
              <li className="nav-item">
                <a href={urlFor('root')} className="nav-link">Users</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
