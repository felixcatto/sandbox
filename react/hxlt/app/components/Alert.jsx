import React from 'react';
import cn from 'classnames';

export default class Alert extends React.Component {
  render() {
    const alertClass = cn('alert', {
      [`alert-${this.props.type}`]: true,
    });
    return (
      <div className={alertClass} role="alert">
        {this.props.children}
      </div>
    );
  }
}
