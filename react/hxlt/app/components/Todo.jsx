import React from 'react';
import { uniqueId } from 'lodash';


export default class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      taskText: '',
    };
  }

  onRemove = (id) => () => {
    this.setState(prevState => ({
      tasks: prevState.tasks.filter(task => task.id !== id)
    }));
  };

  onAdd = (e) => {
    e.preventDefault();
    const { taskText } = this.state;
    this.setState(prevState => ({
      tasks: [{ id: uniqueId(), text: taskText }, ...prevState.tasks],
      taskText: '',
    }));
  };

  onChange = (e) => {
    const taskText = e.target.value;
    this.setState(() => ({ taskText: taskText }));
  };

  render() {
    const { tasks, taskText } = this.state;
    return (
      <div>
        <div className="mb-3">
          <form className="todo-form form-inline mx-3">
            <div className="form-group">
              <input type="text" value={taskText} className="form-control mr-3"
                placeholder="I am going..." onChange={this.onChange}
              />
            </div>
            <button type="submit" className="btn btn-primary" onClick={this.onAdd}>add</button>
          </form>
        </div>
        {tasks.map(task => (
          <Item task={task.text} key={task.id} onRemove={this.onRemove(task.id)} />
        ))}
      </div>
    );
  }
}


function Item ({ task, onRemove }) {
  return (
    <div>
      <div className="row">
        <div>
          <form className="todo-remove-item-form" action="">
            <button type="submit" className="btn btn-primary btn-sm" onClick={onRemove}>-</button>
          </form>
        </div>
        <div className="col-10">{task}</div>
      </div>
      <hr/>
    </div>
  );
}
