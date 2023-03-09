import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, ErrorMessage } from 'formik';
import { Debug } from './Debug';


const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const required = value => (value ? undefined : 'Required');

class Wizard extends React.Component {
  static Page = ({ children }) => children;

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      values: props.initialValues,
    };
  }

  next = values => this.setState(state => ({
    page: Math.min(state.page + 1, this.props.children.length - 1),
    values,
  }));

  previous = () => this.setState(state => ({
    page: Math.max(state.page - 1, 0),
  }))

  validate = (values) => {
    const { children } = this.props;
    const { page } = this.state;
    const activePage = React.Children.toArray(children)[page];
    return activePage.props.validate ? activePage.props.validate(values) : {};
  }

  handleSubmit = (values, bag) => {
    const { children, onSubmit } = this.props;
    const { page } = this.state;
    const isLastPage = page === React.Children.count(children) - 1;
    if (isLastPage) {
      onSubmit(values, bag);
    } else {
      this.next(values);
      bag.setTouched({});
      bag.setSubmitting(false);
    }
  };

  render() {
    const { children } = this.props;
    const { page, values } = this.state;
    const activePage = React.Children.toArray(children)[page];
    const isLastPage = page === React.Children.count(children) - 1;
    return (
      <Formik
        initialValues={values}
        validate={this.validate}
        onSubmit={this.handleSubmit}
        render={({
          handleSubmit, isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            {activePage}
            <div className="buttons">
              {page > 0 && (
                <button
                  type="button"
                  className="secondary"
                  onClick={this.previous}
                >
                  « Previous
                </button>
              )}

              {!isLastPage && <button type="submit">Next »</button>}
              {isLastPage && (
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              )}
            </div>

            <Debug />
          </form>
        )}
      />
    );
  }
}

Wizard.propTypes = {
  initialValues: PropTypes.object.isRequired,
  children: PropTypes.arrayOf(PropTypes.any),
  onSubmit: PropTypes.func.isRequired,
};

const WizardForm = () => (
  <div className="App">
    <h1>Multistep / Form Wizard </h1>
    <Wizard
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        favoriteColor: '',
      }}
      onSubmit={async (values, actions) => {
        await sleep(1000);
        window.alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }}
    >
      <Wizard.Page>
        <div className="mb-15">
          <label className="mb-5">First Name</label>
          <Field
            name="firstName"
            component="input"
            type="text"
            placeholder="First Name"
            validate={required}
            className="form-control"
          />
          <ErrorMessage name="firstName" component="div" className="field-error" />
        </div>
        <div className="mb-15">
          <label className="mb-5">Last Name</label>
          <Field
            name="lastName"
            component="input"
            type="text"
            placeholder="Last Name"
            validate={required}
            className="form-control"
          />
          <ErrorMessage name="lastName" component="div" className="field-error" />
        </div>
      </Wizard.Page>
      <Wizard.Page
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          }
          if (!values.favoriteColor) {
            errors.favoriteColor = 'Required';
          }
          return errors;
        }}
      >
        <div className="mb-15">
          <label className="mb-5">Email</label>
          <Field
            name="email"
            component="input"
            type="email"
            placeholder="Email"
            className="form-control"
          />
          <ErrorMessage name="email" component="div" className="field-error" />
        </div>
        <div className="mb-15">
          <label className="mr-10">Favorite Color</label>
          <Field name="favoriteColor" component="select">
            <option value="">Select a Color</option>
            <option value="#ff0000" style={{ color: '#ff0000' }}>❤️ Red</option>
            <option value="#00ff00" style={{ color: '#00ff00' }}>💚 Green</option>
            <option value="#0000ff" style={{ color: '#0000ff' }}>💙 Blue</option>
          </Field>
          <ErrorMessage name="favoriteColor" component="div" className="field-error" />
        </div>
      </Wizard.Page>
    </Wizard>
  </div>
);

export default WizardForm;
