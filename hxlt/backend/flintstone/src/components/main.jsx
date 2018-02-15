import React from 'react';
import Progress from './Progress';

function Alert(props) {
  return (
    <div className="container mt-3">
      <div>
        {props.user} eto boroda
      </div>
      <div className="btn btn-primary mb-2">No way out</div>
      <Progress percentage={66} />
    </div>
  );
}

module.exports = Alert;
