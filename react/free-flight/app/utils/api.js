import axios from 'axios';
import queryString from 'query-string';


const HOST = 'http://api.openweathermap.org/data/2.5/';
const WEATHER = 'weather';
const FORECAST = 'forecast';
const defaultParams = {
  APPID: '48c622fbfaa36f99cc77921b14fc48a0',
  type: 'accurate',
};


function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}


function getTodayForecast(city) {
  const params = Object.assign({}, defaultParams);
  params.q = city;
  return axios.get(`${HOST}${WEATHER}?${queryString.stringify(params)}`)
    .then(response => response.data);
}


function getFiveDaysForecast(city) {
  const params = Object.assign({}, defaultParams);
  params.q = city;
  return axios.get(`${HOST}${FORECAST}?${queryString.stringify(params)}`)
    .then((response) => {
      const data = response.data;
      let tmp = {};
      let result = [];
      data.list.forEach((el) => {
        const d = new Date(el.dt_txt);
        const date = d.getDate();
        const hour = d.getHours();
        el.date = date;
        if (!tmp[date] && hour === 12) {
          tmp[date] = el;
        }
      });
      for (let ikey in tmp) {
        result.push(tmp[ikey]);
      }

      const firstListEl = data.list[0];
      const firstResultEl = result[0];
      const today = new Date().getDate();
      if (new Date(firstResultEl.dt_txt).getDate() !== today) {
        result.unshift(firstListEl);
      }

      data.list = result;
      return data;
    });
}


export { getTodayForecast, getFiveDaysForecast, wait };
