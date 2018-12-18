import React from 'react';
import Layout from 'Views/layout';
import Form from './form';


export default ({ user, errors }) => (
  <Layout>
    <div className="container">
      <h1>Create New User</h1>
      <Form user={user} errors={errors}/>
    </div>
  </Layout>
);
