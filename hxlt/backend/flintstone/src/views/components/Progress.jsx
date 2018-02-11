import React from 'react';

class Progress extends React.Component {
  render() {
    const { percentage } = this.props;
    return (
      <div className="progress">
        <div className="progress-bar" style={{ width: `${percentage}%`}}>
        </div>
      </div>
    );
  }
}

module.exports = Progress;
