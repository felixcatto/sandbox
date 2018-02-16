import React from 'react';
import Layout from '../../components/Layout';

module.exports = ({ weaponsList }) => {
  return (
    <Layout>
      <div className="container">
        <h2>List of weapons</h2>
        <ul>
          {weaponsList.map(weapon => (
            <li>{weapon.name}</li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
