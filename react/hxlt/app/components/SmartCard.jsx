import React from 'react';

export default function SmartCard({ title, text }) {
  if (!title && !text) {
    return null;
  }
  return (
    <div className="card">
      <div className="card-body">
        {title &&
          <h4 className="card-title">{title}</h4>
        }
        {text &&
          <p className="card-text">{text}</p>
        }
      </div>
    </div>
  );
}
