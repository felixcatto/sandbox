import './ForecastPicture.scss';
import React from 'react';
import PropTypes from 'prop-types';


function ForecastPicture(props) {
  const { iconSrc, date } = props;
  return (
    <div className="forecast-picture">
      <img src={iconSrc} className="forecast-picture__img" />
      <div className="forecast-picture__desc">{date}</div>
    </div>
  );
}
ForecastPicture.propTypes = {
  iconSrc: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
}


export default ForecastPicture;
