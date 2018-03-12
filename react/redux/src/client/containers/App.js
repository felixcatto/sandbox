import { connect } from 'react-redux';
import App from '../components/App.js';
import * as actionCreators from '../actions';


const mapStateToProps = ({ tasks, newTaskText }) => ({
  tasks: Object.values(tasks),
  newTaskText,
});

export default connect(mapStateToProps, actionCreators)(App);
