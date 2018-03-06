import React from 'react';

export default class Progress extends React.Component {
  render() {
    const { percentage } = this.props;
    return (
      <div className="progress">
        <div className="progress-bar" role="progressbar" 
          aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100" 
          style={{ width: `${percentage}%`}}
        >
        </div>
      </div>
    );
  }
}
