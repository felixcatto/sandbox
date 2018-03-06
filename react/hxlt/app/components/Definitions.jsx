import React from 'react';

export default class Definitions extends React.Component {
  render() {
    const { data } = this.props;
    if (data.length === 0) {
      return null;
    }
    return (
      <dl>
        {this.props.data.map((el, i) => [
          <dt key={`dt-${i}`}>{el.dt}</dt>,
          <dd key={`dd-${i}`}>{el.dd}</dd>,
        ])}
      </dl>
    );
  }
}
