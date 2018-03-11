import { connect } from 'react-redux';
import App from '../components/App.js';


const mapStateToProps = ({ tasks, newTaskText }) => ({
  tasks: Object.values(tasks),
  newTaskText,
});

export default connect(mapStateToProps)(App);
