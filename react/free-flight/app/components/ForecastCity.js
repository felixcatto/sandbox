import './ForecastCity.scss';
import ForecastPicture from './ForecastPicture';
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const pathToClouds = require.context('../assets/img/weather-icons', true);


function ForecastCity({ data, match }) {
  return (
    <div className="container forecast-city">
      <h1 className="forecast-city__title">{data.city.name}, {data.city.country}</h1>
      <div className="row row_flex-wrap">
        {data.list.map((el, i) => {
          const detailLink = `${match.url}/${el.date}`;
          const params = {
            date: moment(el.dt_txt, 'YYYY-MM-DD').format('dddd, MMM D'),
            iconSrc: pathToClouds(`./${el.weather[0].icon}.svg`),
          };
          return (
            <div className="col-xs-12 col-sm-6 col-md-4 mb-60" key={i}>
              <Link className="forecast-city__link" to={{ pathname: detailLink }}>
                <ForecastPicture {...params} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
ForecastCity.propTypes = {
  data: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};


export default ForecastCity;
