import React, { useContext } from 'react';
import context from 'Lib/context';


export default (props) => {
  const { urlFor } = useContext(context);
  const { user, type } = props;
  const action = type === 'edit'
    ? `${urlFor('user', { id: user.id })}?_method=PUT`
    : `${urlFor('users')}`;

  return (
    <form action={action} method="post">
      <div className="row mb-20">
        <div className="col-6">
          <div className="mb-15">
            <label>First Name</label>
            <input type="text" className="form-control" name="firstName" value={user.firstName}/>
          </div>
          <div className="mb-15">
            <label>Last Name</label>
            <input type="text" className="form-control" name="lastName" value={user.lastName}/>
          </div>
          <div className="mb-15">
            <label>Email</label>
            <input type="text" className="form-control" name="email" value={user.email}/>
          </div>
          <div>
            <label>Password</label>
            <input type="password" className="form-control" name="password" value={user.password}/>
          </div>
        </div>
      </div>

      <a href={urlFor('users')} className="mr-10">Back</a>
      <button className="btn btn-primary" type="submit">Save</button>
    </form>
  );
};
