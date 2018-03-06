import './Forecast.scss';
import React from 'react';
import { Route, Switch} from 'react-router-dom';
import Spinner from './Spinner';
import ForecastCity from './ForecastCity';
import ForecastDay from './ForecastDay';
import { getFiveDaysForecast } from '../utils/api';


class Forecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDataLoading: true,
      city: props.match.params.city,
      data: null,
    };
  }
  componentDidMount() {
    getFiveDaysForecast(this.state.city)
      .then(data => {
        this.setState(() => ({ data, isDataLoading: false }));
      });
  }
  componentWillReceiveProps(nextProps) {
    const city = nextProps.match.params.city;
    if (city === this.state.city) return;

    this.setState(() => ({ isDataLoading: true }));
    getFiveDaysForecast(city)
      .then(data => {
        this.setState(() => ({ data, city, isDataLoading: false }));
      });
  }
  render() {
    const { data, isDataLoading } = this.state;
    return (
      <div>
        {isDataLoading &&
          <div className="pt-20 pb-20">
            <Spinner/>
          </div>
        }
        {!isDataLoading &&
          <Switch>
            <Route exact path="/forecast/:city" render={(props) => (
              <ForecastCity {...props} data={data} />
            )}></Route>
            <Route exact path="/forecast/:city/:date" render={(props) => (
              <ForecastDay {...props} data={data} date={props.match.params.date} />
            )}></Route>
          </Switch>
        }
      </div>
    );
  }
}


export default Forecast;
