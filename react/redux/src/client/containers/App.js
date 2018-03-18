import { connect } from 'react-redux';
import App from '../components/App';
import * as actionCreators from '../actions';
import { getTasks } from '../selectors';


const mapStateToProps = state => ({
  tasks: getTasks(state),
  tasksFetchingState: state.tasksFetchingState,
});

export default connect(mapStateToProps, actionCreators)(App);
