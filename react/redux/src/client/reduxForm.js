import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import { createAction, handleActions } from 'redux-actions';
import { composeWithDevTools } from 'redux-devtools-extension';


class IForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      fame: '',
      glory: '',
    };
  }

  onChange = (name) => (e) => {
    const value = e.target.value;
    this.setState(() => ({ [name]: value }));
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.saveForm(this.state);
  };

  render() {
    console.log(this.props);
    const { name, fame, glory } = this.state;
    return (
      <div className="container">
        <form action="" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" className="form-control" value={name} onChange={this.onChange('name')} />
          </div>
          <div className="form-group">
            <label>Fame</label>
            <input type="text" className="form-control" value={fame} onChange={this.onChange('fame')} />
          </div>
          <div className="form-group">
            <label>Glory</label>
            <input type="text" className="form-control" value={glory} onChange={this.onChange('glory')} />
          </div>
          <button className="btn btn-primary" type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const actionCreators = {
  saveForm: createAction('FORM_SAVE'),
};

const reducers = combineReducers({
  myForm: handleActions({
    [actionCreators.saveForm]: (state, { payload: newFormState }) => newFormState,
  }, {}),
});

const store = createStore(reducers, composeWithDevTools());

const AppContainer = connect(state => state.myForm, actionCreators)(IForm);

render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('app'),
);
