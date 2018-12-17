import React from 'react';
import Layout from 'Views/layout';
import { emptyObject } from 'Lib/utils';
import Form from './form';


export default () => (
  <Layout>
    <div className="container">
      <h1>Create New User</h1>
      <Form user={emptyObject}/>
    </div>
  </Layout>
);
