import { connect } from 'react-redux';
import App from '../components/App.js';
import * as actionCreators from '../actions';
import { getTasks } from '../selectors';


const mapStateToProps = (state) => ({
  tasks: getTasks(state),
  newTaskText: state.newTaskText,
});

export default connect(mapStateToProps, actionCreators)(App);
