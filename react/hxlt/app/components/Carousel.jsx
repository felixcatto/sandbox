import React from 'react';
import cn from 'classnames';

export default class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeSlide: 0 };
  }

  onPreviousClick = () => {
    const imagesCount = this.props.images.length;
    const activeSlide = (this.state.activeSlide + imagesCount - 1) % imagesCount;
    this.setState(() => ({ activeSlide }));
  };

  onNextClick = () => {
    const imagesCount = this.props.images.length;
    const activeSlide = (this.state.activeSlide + 1) % imagesCount;
    this.setState(() => ({ activeSlide }));
  };

  render() {
    const carouselItemClass = i => cn('carousel-item', {
      active: this.state.activeSlide === i,
    });
    return (
      <div style={{ background: 'rgba(0,0,255,0.8)', margin: 'auto', width: '400px' }}>
        <div className="carousel slide">
          <div className="carousel-inner">
            {this.props.images.map((image, i) => (
              <div className={carouselItemClass(i)} key={i}>
                <img className="d-block w-100" src={image}/>
              </div>
            ))}
          </div>
          <a className="carousel-control-prev" href="#" role="button" data-slide="prev" onClick={this.onPreviousClick}>
            <span className="carousel-control-prev-icon"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#" role="button" data-slide="next" onClick={this.onNextClick}>
            <span className="carousel-control-next-icon"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    );
  }
}
