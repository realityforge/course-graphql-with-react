import React, { Component } from 'react';

class AuthForm extends Component {
  constructor( props ) {
    super( props );
    this.state = { email: '', password: '', errors: [] };
  }

  onSubmit = ( event ) => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.onSubmit( email, password );
  };

  updateEmail = ( event ) => {
    this.setState( { email: event.target.value } );
  };

  updatePassword = ( event ) => {
    this.setState( { password: event.target.value } );
  };

  render() {
    return (
      <div className="row">
        <form className="col s4" onSubmit={this.onSubmit}>
          <div className="input-field">
            <input type="text"
                   placeholder="Email"
                   value={this.state.email}
                   onChange={this.updateEmail}/>
          </div>
          <div className="input-field">
            <input type="password"
                   placeholder="Password"
                   value={this.state.password}
                   onChange={this.updatePassword}/>
          </div>
          <div className="errors">
            {this.props.errors.map( error => <div key={error}>{error}</div> )}
          </div>
          <button className="btn">{this.props.authLabel}</button>
        </form>
      </div>
    );
  }
}

export default AuthForm;
