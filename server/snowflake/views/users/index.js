import React, { useContext } from 'react';
import Layout from 'Views/layout';
import { Link } from 'Views/mixins';
import context from 'Lib/context';


export default (props) => {
  const { urlFor } = useContext(context);
  const { users } = props;
  return (
    <Layout>
      <div className="container">
        <h1>Users List</h1>

        <a href={urlFor('newUser')} className="d-inline-block mb-20">
          <button className="btn btn-primary">Create new user</button>
        </a>

        <table className="table">
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Password</th>
            <th></th>
          </tr>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>
                <div className="d-flex justify-content-end">
                  <a href={urlFor('editUser', { id: user.id })} className="mr-10">
                    <button className="btn btn-sm btn-outline-primary">
                      Edit User
                    </button>
                  </a>
                  <Link action={`${urlFor('user', { id: user.id })}?_method=DELETE`}>
                    <button className="btn btn-sm btn-outline-primary" type="submit">
                      Remove User
                    </button>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </Layout>
  );
};
