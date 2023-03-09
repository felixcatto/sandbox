import React from 'react';

export default class ListGroup extends React.Component {
  render() {
    return (
      <ul className="list-group">
        {React.Children.map(this.props.children, (child) => {
          return <li className="list-group-item">{child}</li>;
        })}
      </ul>
    );
  }
}
