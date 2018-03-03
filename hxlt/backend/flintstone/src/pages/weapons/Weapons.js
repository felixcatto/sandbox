import React from 'react';
import withContext from '../../components/withContext';
import Layout from '../../components/Layout';

const Weapons = ({ weaponsList }) => {
  return (
    <Layout>
      <div className="container">
        <h2>List of weapons</h2>
        <ul>
          {weaponsList.map(weapon => (
            <li>{weapon.name}</li>
          ))}
        </ul>
        <div id="Todo"></div>
      </div>
    </Layout>
  );
};

export default withContext(Weapons);
