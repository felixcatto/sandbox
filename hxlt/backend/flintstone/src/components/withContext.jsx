import React from 'react';
import PropTypes from 'prop-types';

function withContext(WrappedComponent) {
  class WithContext extends React.Component {
    getChildContext() {
      return {
        url: this.props.url,
        pathname: this.props.pathname,
      };
    }

    render() {
      return <WrappedComponent {...this.props}/>
    }
  }
  WithContext.childContextTypes = {
    url: PropTypes.func,
    pathname: PropTypes.string,
  };
  return WithContext;
}

module.exports = withContext;
