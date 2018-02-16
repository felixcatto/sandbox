import React from 'react';
import Layout from '../../components/Layout';

module.exports = (props) => {
  return (
    <Layout>
      <div className="container">
        <h2>Hello guys</h2>
        <p>
          Welcome to our new app. It has many cool features such as automatic gulp setup,
          written in es6 style, scss -> css pipeline, react templating. But this is 
          only beginning. In future we add posgress db and front-end interactive 
          components! Do not miss it :)
        </p>
      </div>
    </Layout>
  );
}
