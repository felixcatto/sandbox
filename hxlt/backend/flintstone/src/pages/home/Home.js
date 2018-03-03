import React from 'react';
import withContext from '../../components/withContext';
import Layout from '../../components/Layout';
import Stub from '../../components/Stub';

const Home = (props) => {
  return (
    <Layout>
      <div className="container">
        <h2>Hello guys</h2>
        <p>
          Welcome to our new app. It has many cool features such as automatic gulp setup,
          written in es6 style, scss -> css pipeline, react templating. But this is 
          only beginning. In future we will add posgress db and front-end interactive 
          components! Do not miss it :)
        </p>
        <p>Update: interactive front-end components have added (3.03.2018)</p>
        <div id="BtnGroup"></div>
      </div>
    </Layout>
  );
};

export default withContext(Home);
