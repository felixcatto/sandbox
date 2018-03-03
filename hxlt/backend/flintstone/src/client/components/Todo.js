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
        <div className="mb-15">
          <form className="todo-form form-inline">
            <div className="form-group">
              <input type="text" value={taskText} className="form-control mr-15"
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


const Item = ({ task, onRemove }) => (
  <div className="mb-5">
    <button type="submit" className="btn btn-primary btn-sm mr-10" onClick={onRemove}>-</button>
    <span>{task}</span>
    <hr/>
  </div>
);
