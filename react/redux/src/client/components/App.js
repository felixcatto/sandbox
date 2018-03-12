import React from 'react';
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

  render() {
    const { tasks, newTaskText } = this.props;
    return (
      <div className="col-5">
        
        <form action="" className="form-inline">
          <div className="form-group mx-sm-3">
            <input type="text" className="form-control" value={newTaskText} onChange={this.onTextChange} />
          </div>
          <button type="submit" className="btn btn-primary btn-sm" onClick={this.onTaskAdd}>
            Add
          </button>
        </form>

        {!isEmpty(tasks) &&
          <div className="mt-3">
            <ul className="list-group">
              {tasks.map((task) => (
                <li className="list-group-item d-flex justify-content-between" key={task.id}>
                  <div>{task.text}</div>
                  <a href="#" onClick={this.onRemove(task.id)}>x</a>
                </li>
              ))}
            </ul>
          </div>
        }

      </div>
    );
  }
}
