import './ForecastDay.scss';
import ForecastPicture from './ForecastPicture';
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
const pathToClouds = require.context('../assets/img/weather-icons', true);


function ForecastDay({ data, date }) {
  const getCelsiusTemperature = kelvinTemp => (kelvinTemp - 273.15).toFixed(2);
  const oneDayData = data.list.find(el => el.date === +date);
  const formattedDate = moment(oneDayData.dt_txt, 'YYYY-MM-DD').format('dddd, MMM D');
  const iconSrc = pathToClouds(`./${oneDayData.weather[0].icon}.svg`);

  return (
    <div className="container forecast-day">
      <div className="mb-50">
        <ForecastPicture date={formattedDate} iconSrc={iconSrc} />
      </div>
      <div className="forecast-day__info">{data.city.name}</div>
      <div className="forecast-day__info">
        {oneDayData.weather[0].description}
      </div>
      <div className="forecast-day__info">
        min temp: {getCelsiusTemperature(oneDayData.main.temp_min)} degrees
      </div>
      <div className="forecast-day__info">
        max temp: {getCelsiusTemperature(oneDayData.main.temp_max)} degrees
      </div>
      <div className="forecast-day__info">
        ground level: {oneDayData.main.grnd_level}
      </div>
    </div>
  );
};
ForecastDay.propTypes = {
  data: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
};


export default ForecastDay;
