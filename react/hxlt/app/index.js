import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery';
import 'popper.js';
import 'bootstrap';
import Card from './components/Card.jsx';
import SmartCard from './components/SmartCard.jsx';
import Definitions from './components/Definitions.jsx';
import Progress from './components/Progress.jsx';
import Alert from './components/Alert.jsx';
import ListGroup from './components/ListGroup.jsx';
import BtnGroup from './components/BtnGroup.jsx';
import Carousel from './components/Carousel.jsx';
import Collapse from './components/Collapse.jsx';
import Form from './components/Form.jsx';
import Log from './components/Log.jsx';
import Todo from './components/Todo.jsx';
import Icard from './components/Icard.jsx';
import ModalUser from './components/ModalUser.jsx';


const render = component => ReactDOM.render(component, document.querySelector('#app'));
// ReactDOM.render(<Card />, document.querySelector('#app'));

// ReactDOM.render(
//   <SmartCard
//     title="hi"
//     text="vasa eto boroda"
//   />, document.querySelector('#app'));

// ReactDOM.render(
//   <Card
//     title="hi"
//     text="vasa eto boroda"
//   />, document.querySelector('#app'));

// const definitions = [
//   { dd: 'one', dt: 'two' },
//   { dd: 'another term', dt: 'another description' },
// ];
// ReactDOM.render(<Definitions data={definitions} />, document.querySelector('#app'));

// ReactDOM.render(<Progress percentage={40} />, document.querySelector('#app'));

// ReactDOM.render(
//   <Alert type="info">
//     <div>what is love?</div>
//     <div>idk</div>
//   </Alert>
//   , document.querySelector('#app'));

// ReactDOM.render(
//   <ListGroup>
//     <p>one</p>
//     <p>two</p>
//   </ListGroup>
//   , document.querySelector('#app'));

// ReactDOM.render(<BtnGroup/>, document.querySelector('#app'));

// const imgContext = require.context('./assets/img/', true);
// const imagePaths = imgContext.keys().map(key => imgContext(key))
// ReactDOM.render(<Carousel images={imagePaths}/>, document.querySelector('#app'));

// ReactDOM.render(<Collapse text="ggwp lanaya" opened={true}/>, document.querySelector('#app'));


// render(<Form />);

// render(<Log />);

// render(
//   <Icard>
//     <Icard.Body>
//       <Icard.Title>Title</Icard.Title>
//       <Icard.Text>Text</Icard.Text>
//     </Icard.Body>
//   </Icard>
// );

render(<ModalUser/>);
