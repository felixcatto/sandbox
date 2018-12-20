import React from 'react';
import Layout from 'Views/layout';
import Form from './form';


export default props => (
  <Layout>
    <div className="container">
      <h1>Edit Article</h1>
      <Form {...props}/>
    </div>
  </Layout>
);
