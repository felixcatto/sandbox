import React from 'react';

export default class Log extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      values: [],
    };
  }

  onIncrement = () => {
    this.setState(prevState => ({
      counter: prevState.counter + 1,
      values: [prevState.counter + 1, ...prevState.values],
    }));
  };

  onDecrement = () => {
    this.setState(prevState => ({
      counter: prevState.counter - 1,
      values: [prevState.counter - 1, ...prevState.values],
    }));
  };

  onDelete = (i) => () => {
    this.setState(prevState => ({
      counter: prevState.counter,
      values: prevState.values.filter(value => value !== i),
    }));
  };

  render() {
    const { values } = this.state;
    return (
      <div>
        <div className="btn-group" role="group">
          <button className="btn hexlet-inc" onClick={this.onIncrement}>+</button>
          <button className="btn hexlet-dec" onClick={this.onDecrement}>-</button>
        </div>
        {values.length !== 0 &&
          <ul className="list-group">
            {values.map((value, i) => (
              <li className="list-group-item" key={i} onClick={this.onDelete(value)}>
                <a href="#">{value}</a>
              </li>
            ))}
          </ul>
        }
      </div>
    );
  }
}
