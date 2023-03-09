import React from 'react';
import cn from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ss from './Animation.local.scss';
import './Animation.scss';


export default class Animation extends React.Component {
  state = {
    position: 'left',
    isBirdShown: false,
  }

  onPositionChange = position => () => {
    this.setState({ position });
  }

  onShowBird = () => {
    this.setState(prevState => ({ isBirdShown: !prevState.isBirdShown }));
  }

  onLoadModule = async () => {
    const { default: data } = await import('../lib/async.js');
    console.log(data);
  }

  render() {
    const { position, isBirdShown } = this.state;
    const squareClass = cn(ss.square, 'mb-20', {
      [ss.square_left]: position === 'left',
      [ss.square_right]: position === 'right',
    });

    return (
      <div>

        <h1>Trying some basic stuff</h1>

        <div className="mb-40">
          <div className={squareClass}></div>
          <button className="btn btn-primary mr-10" onClick={this.onPositionChange('left')}>
            To Left!
          </button>
          <button className="btn btn-primary mr-10" onClick={this.onPositionChange('right')}>
            To Right!
          </button>
          <button className="btn btn-primary" onClick={this.onLoadModule}>
            Async?
          </button>
        </div>

        <div>
          <button className="btn btn-primary mb-20" onClick={this.onShowBird}>
            Show A Bird!
          </button>
          <ReactCSSTransitionGroup
            transitionName="imageContainer"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >
            {isBirdShown &&
              <div className={ss.imageContainer} key={0}>
                <img src="/img/lion.jpg" className={ss.image}/>
              </div>
            }
          </ReactCSSTransitionGroup>
        </div>

      </div>
    );
  }
}
