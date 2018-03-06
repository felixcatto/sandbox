import axios from 'axios';
import cn from 'classnames';
import _ from 'lodash';
import React from 'react';
import update from 'immutability-helper';
import routes from '../utils/routes';

// BEGIN (write your solution here)
export default class TodoBox extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     tasks: [],
  //     newTaskText: '',
  //   };
  // }

  state = { newTaskText: '', tasks: [] };

  async componentDidMount() {
    const res = await axios.get('/tasks');
    this.setState(() => ({ tasks: res.data  }));
  }

  onChange = (e) => {
    const { value } = e.target;
    this.setState(() => ({ newTaskText: value }));
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(routes.tasksPath(), {
      text: this.state.newTaskText,
    });
    this.setState((ps) => ({
      tasks: [res.data, ...ps.tasks],
      newTaskText: '' 
    }));
  };

  onLinkClick = (id) => async (e) => {
    e.preventDefault();
    const { tasks } = this.state;
    const task = tasks.find(el => el.id === id);
    const index = tasks.findIndex(el => el.id === id);
    const path = task.state === 'active' ? 'finishTaskPath' : 'activateTaskPath';
    const res = await axios.patch(routes[path](id));
    const newTasks = update(tasks, { [index]: { state: { $set: res.data.state } } });
    this.setState(() => ({ tasks: newTasks }));
  };

  render() {
    const { newTaskText, tasks } = this.state;
    return (
      <div>
        <div className="mb-3">
          <form className="todo-form form-inline mx-3" onSubmit={this.onSubmit}>
            <div className="form-group">
              <input type="text" value={newTaskText} className="form-control mr-3" placeholder="I am going..." 
                onChange={this.onChange} />
            </div>
            <button type="submit" className="btn btn-primary">add</button>
          </form>
        </div>
        {tasks.length !== 0 &&
          <div className="todo-active-tasks">
            {tasks.map(task => (
              <div className="row" key={task.id}>
                <div className="col-1">{task.id}</div>
                <div className="col">
                  {task.state === 'active' &&
                    <a target="_blank" href="#" className="todo-task" onClick={this.onLinkClick(task.id)}>{task.text}</a>
                  }
                  {task.state === 'finished' &&
                    <s><a target="_blank" href="#" className="todo-task" onClick={this.onLinkClick(task.id)}>{task.text}</a></s>
                  }
                </div>
              </div>
            ))}
          </div>
        }
      </div>
    );
  }
}
// END
