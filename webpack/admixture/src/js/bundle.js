import React from 'react';
import ReactDOM from 'react-dom';
import Form from './components/Form.jsx';
import Log from './components/Log.jsx';
import config from '../../package.json';

console.log(config);
const render = component => ReactDOM.render(component, document.querySelector('#app'));

// render(<Form />);
render(<Log />);

