import React from 'react';
import Layout from 'Views/layout';
import Form from './form';


export default ({ user, type }) => (
  <Layout>
    <div className="container">
      <h1>Edit User</h1>
      <Form user={user} type={type}/>
    </div>
  </Layout>
);
