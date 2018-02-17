import React from 'react';
import PropTypes from 'prop-types';

const Stub = (props, ctx) => {
  return (
    <p>I am stub {ctx.url('weapons')}</p>
  );
}

Stub.contextTypes = {
  url: PropTypes.func,
};

module.exports = Stub;
