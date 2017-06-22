import React, { Component } from 'react';

class AuthForm extends Component {
  constructor( props ) {
    super( props );
    this.state = { email: '', password: '' };
  }

  onSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.onSubmit( { email, password } );
  }

  render() {
    return (
      <div className="row">
        <form className="col s4" onSubmit={e => this.onSubmit(e)}>
          <div className="input-field">
            <input type="text"
                   placeholder="Email"
                   value={this.state.email}
                   onChange={e => this.setState( { email: e.target.value } )}/>
          </div>
          <div className="input-field">
            <input type="password"
                   placeholder="Password"
                   value={this.state.password}
                   onChange={
                     e => this.setState( { password: e.target.value } )}/>
          </div>
          <button className="btn">{this.props.authLabel}</button>
        </form>
      </div>
    );
  }
}

export default AuthForm;
