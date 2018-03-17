import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import { createAction, handleActions } from 'redux-actions';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as formReducer, reduxForm, Field } from 'redux-form';


class IForm extends React.Component {
  onSubmit = (values) => {
    console.log(values);
    this.props.reset();
  };

  render() {
    return (
      <div className="container">
        <form action="" onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <div className="form-group">
            <label>Name</label>
            <Field name="name" className="form-control" component="input" type="text" />
          </div>
          <div className="form-group">
            <label>Fame</label>
            <Field name="fame" className="form-control" component="input" type="text" />
          </div>
          <div className="form-group">
            <label>Glory</label>
            <Field name="glory" className="form-control" component="input" type="text" />
          </div>
          <button className="btn btn-primary" type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const reducers = combineReducers({
  form: formReducer,
});

const store = createStore(reducers, composeWithDevTools());

const wrappedForm = reduxForm({ form: 'myForm' })(IForm);
const AppContainer = connect(state => state.form)(wrappedForm);

render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('app'),
);
