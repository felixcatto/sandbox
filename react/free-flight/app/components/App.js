import 'bootstrap-grid';
import 'font-awesome/css/font-awesome.css'
import '../utils/bootstrap.complement.css';
import './App.scss';
import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Forecast from './Forecast';


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header/>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/index.html" component={Home}></Route>
            <Route path="/forecast/:city" component={Forecast}></Route>
            <Route render={() => <p>Not found</p> }/>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}


export default App;
