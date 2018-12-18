import React, { useContext } from 'react';
import context from 'Lib/context';
import { Error } from 'Views/mixins';


export default (props) => {
  const { urlFor } = useContext(context);
  const { user, type, errors } = props;
  const action = type === 'edit'
    ? `${urlFor('user', { id: user.id })}?_method=PUT`
    : `${urlFor('users')}`;

  return (
    <form action={action} method="post">
      <div className="row mb-20">
        <div className="col-6">
          <div className="mb-15">
            <label>First Name</label>
            <input type="text" className="form-control" name="firstName" defaultValue={user.firstName}/>
          </div>
          <div className="mb-15">
            <label>Last Name</label>
            <input type="text" className="form-control" name="lastName" defaultValue={user.lastName}/>
          </div>
          <div className="mb-15">
            <label>Email</label>
            <input type="text" className="form-control" name="email" defaultValue={user.email}/>
            <Error name="email" errors={errors}/>
          </div>
          <div>
            <label>Password</label>
            <input type="password" className="form-control" name="password" defaultValue={user.password}/>
            <Error name="password" errors={errors}/>
          </div>
        </div>
      </div>

      <a href={urlFor('users')} className="mr-10">Back</a>
      <button className="btn btn-primary" type="submit">Save</button>
    </form>
  );
};
