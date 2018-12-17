import React, { useContext } from 'react';
import cn from 'classnames';
import Context from 'Lib/context';


export default () => {
  const { urlFor, currentUrl } = useContext(Context);

  const activeLinkClass = (choosenUrl) => {
    if (currentUrl !== '/' && choosenUrl === '/') {
      return 'nav-link';
    }

    return cn('nav-link', {
      active: currentUrl.startsWith(choosenUrl),
    });
  };

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
                <a href={urlFor('root')} className={activeLinkClass(urlFor('root'))}>
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a href={urlFor('users')} className={activeLinkClass(urlFor('users'))}>
                  Users
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
