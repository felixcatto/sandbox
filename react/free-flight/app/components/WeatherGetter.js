import './WeatherGetter.scss';
import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { Link, withRouter } from 'react-router-dom';


class WeatherGetter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
  }
  handleChange(event) {
    var city = event.target.value;
    this.setState(() => ({ city }));
  }
  handleKeydown(event) {
    if (event.key === 'Enter') {
      event.target.value = '';
    }
  }
  render() {
    const layout = this.props.layout
    const weatherGetterClass = layout === 'inline'
      ? 'weather-getter_inline'
      : '';
    const inputClass = layout === 'inline'
      ? 'weather-getter__input_inline'
      : 'weather-getter__input_block';
    return (
      <div className={`weather-getter ${weatherGetterClass}`}>
        <input type="text" className={`weather-getter__input form-control ${inputClass}`} 
          placeholder="St. George, Utah"
          onChange={this.handleChange}
          onKeyDown={this.handleKeydown}
        />
        <Link className="btn btn-success weather-getter__link" to={{
          pathname:  `/forecast/${this.state.city}`
        }}>
            Get Weather
        </Link>
      </div>
    );
  }
}
WeatherGetter.propTypes = {
  layout: PropTypes.string.isRequired,
};
// const WeatherGetter = withRouter(props => <WeatherGetterEX {...props}/>);


export default WeatherGetter;
