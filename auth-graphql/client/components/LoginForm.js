import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';
import LoginUser from '../mutations/LoginUser';
import FindCurrentUser from '../queries/FindCurrentUser';
import AuthForm from './AuthForm';

class LoginForm extends Component {
  onSubmit( { email, password } ) {
    this.props.mutate( {
      variables: { email, password },
      refetchQueries: [{ query: FindCurrentUser }]
    } ).then( () => hashHistory.push( '/' ) );
  }

  render() {
    return (
      <div className="container">
        <h3>Login</h3>
        <AuthForm authLabel="SignIn" onSubmit={this.onSubmit.bind( this )}/>
      </div>
    );
  }
}

export default graphql( LoginUser )( LoginForm );
