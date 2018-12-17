import React from 'react';


export const Link = ({ action, children }) => (
  <form action={action} method="post" className="d-inline-block">
    {children}
  </form>
);
