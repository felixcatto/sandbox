import React from 'react';
import cn from 'classnames';
import { isEmpty } from 'lodash';


export default class App extends React.Component {
  onTaskAdd = (e) => {
    e.preventDefault();
    const { newTaskText } = this.props;
    this.props.addTask({ text: newTaskText });
  };

  onTextChange = (e) => {
    this.props.updateNewTaskText(e.target.value);
  };

  onRemove = (id) => (e) => {
    e.preventDefault();
    this.props.removeTask(id);
  };

  onToggleState = (id) => (e) => {
    e.preventDefault();
    this.props.toggleTaskState(id);
  };

  render() {
    const { tasks, newTaskText } = this.props;
    const taskStateClass = (task) => cn({
      'line-through': task.state === 'finished',
    });
    return (
      <div className="col-5">
        
        <form action="" className="form-inline">
          <div className="form-group">
            <input type="text" className="form-control mr-15" value={newTaskText}
              onChange={this.onTextChange} />
          </div>
          <button type="submit" className="btn btn-primary btn-sm" onClick={this.onTaskAdd}>
            Add
          </button>
        </form>

        {!isEmpty(tasks) &&
          <div className="mt-15">
            <ul className="list-group">
              {tasks.map((task) => (
                <li className="list-group-item d-flex justify-content-between" key={task.id}>
                  <div className={taskStateClass(task)}>{task.text}</div>
                  <div>
                    <a href="#" className="mr-5 px-5" onClick={this.onToggleState(task.id)}>-</a>
                    <a href="#" className="px-5" onClick={this.onRemove(task.id)}>x</a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        }

      </div>
    );
  }
}
