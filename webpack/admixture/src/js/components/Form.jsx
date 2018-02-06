import React from 'react';
import cn from 'classnames';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formState: {
        email: 'vasa@ggwp.ru',
        password: '',
        address: 'ggwp lanaya street',
        city: '',
        country: '',
        acceptRules: true,
      },
      showResult: false,
    };
  }

  setFormState(prop, value) {
    this.setState(prevState => ({ formState: { ...prevState.formState, [prop]: value } }));
  }

  onShowResultChange = () => {
    this.setState(prevState => ({ showResult: !prevState.showResult }));
  };

  onEmailChange = (e) => {
    this.setFormState('email', e.target.value);
  };

  onPasswordChange = (e) => {
    this.setFormState('password', e.target.value);
  };

  onAddressChange = (e) => {
    this.setFormState('address', e.target.value);
  };

  onCityChange = (e) => {
    this.setFormState('city', e.target.value);
  };

  onCountryChange = (e) => {
    this.setFormState('country', e.target.value);
  };

  onAcceptRulesChange = (e) => {
    this.setFormState('acceptRules', e.target.checked);
  };

  renderForm() {
    const { email, password, address, city, country, acceptRules } = this.state.formState;
    return (
      <form>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4" className="col-form-label">Email</label>
            <input type="email" className="form-control" id="inputEmail4" placeholder="Email" onChange={this.onEmailChange} value={email} />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputPassword4" className="col-form-label">Password</label>
            <input type="password" className="form-control" id="inputPassword4" placeholder="Password" value={password} onChange={this.onPasswordChange} />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputAddress" className="col-form-label">Address</label>
          <textarea type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" value={address} onChange={this.onAddressChange} />
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputCity" className="col-form-label">City</label>
            <input type="text" className="form-control" id="inputCity" value={city} onChange={this.onCityChange} />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputCountry" className="col-form-label">Country</label>
            <select id="inputCountry" className="form-control" value={country} onChange={this.onCountryChange}>
              <option value="">Choose</option>
              <option value="argentina">Argentina</option>
              <option value="russia">Russia</option>
              <option value="china">China</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <div className="form-check">
            <label className="form-check-label">
              <input type="checkbox" className="form-check-input" checked={acceptRules} onChange={this.onAcceptRulesChange} />
              Accept Rules
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary" onClick={this.onShowResultChange}>Sign in</button>
      </form>
    );
  }

  renderResult() {
    const { email, password, country, acceptRules } = this.state.formState;
    return <FormResult
      acceptRules={acceptRules}
      country={country}
      email={email}
      password={password}
      onBack={this.onShowResultChange}
    />;
  }

  render() {
    return this.state.showResult ? this.renderResult() : this.renderForm();
  }
}




function FormResult({ acceptRules, country, email, password, onBack }) {
  return (
    <div id="container" className="container m-3">
      <a href="#" onClick={onBack}>Back</a>
      <table className="table">
        <tbody>
          <tr>
            <td>acceptRules</td>
            <td>{acceptRules ? 'true' : 'false'}</td>
          </tr>
          <tr>
            <td>country</td>
            <td>{country}</td>
          </tr>
          <tr>
            <td>email</td>
            <td>{email}</td>
          </tr>
          <tr>
            <td>password</td>
            <td>{password}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};