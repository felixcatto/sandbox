import React from 'react';
import cn from 'classnames';
import { isEmpty } from 'lodash';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeFilter: 'all',
      states: ['all', 'active', 'finished'],
    };
  }

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

  onFilterChange = (state) => (e) => {
    e.preventDefault();
    this.setState(() => ({ activeFilter: state }));
  };

  renderFilterEl(state, activeFilter) {
    return state === activeFilter
      ? <span key={state}>{state}</span>
      : <a key={state} href="#" onClick={this.onFilterChange(state)}>{state}</a>;
  }

  render() {
    const { tasks, newTaskText } = this.props;
    const { activeFilter, states } = this.state;
    const taskStateClass = (task) => cn({
      'line-through': task.state === 'finished',
    });
    const filteredTasks = activeFilter === 'all'
      ? tasks
      : tasks.filter(el => el.state === activeFilter);
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

        {!isEmpty(filteredTasks) &&
          <div className="mt-15">
            <ul className="list-group">
              {filteredTasks.map(task => (
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

        <div className="mt-15 d-flex justify-content-around">
          {states.map(state => this.renderFilterEl(state, activeFilter))}
        </div>

      </div>
    );
  }
}
