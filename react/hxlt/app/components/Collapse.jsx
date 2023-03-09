import React from 'react';
import cn from 'classnames';

export default class Collapse extends React.Component {
  static defaultProps = {
    opened: false,
  };

  constructor(props) {
    super(props);
    this.state = { opened: this.props.opened };
  }

  onClick = () => {
    const isOpened = this.state.opened;
    this.setState(() => ({ opened: !isOpened }));
  };

  render() {
    const collapseClass = cn('collapse', {
      show: this.state.opened,
    });
    return (
      <div>
        <p>
          <a className="btn btn-primary" href="#" onClick={this.onClick}>Link with href</a>
        </p>
        <div className={collapseClass}>
          <div className="card card-body">
            {this.props.text}
          </div>
        </div>
      </div>
    );
  }
}
