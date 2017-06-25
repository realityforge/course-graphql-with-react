import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';
import LoginUser from '../mutations/LoginUser';
import FindCurrentUser from '../queries/FindCurrentUser';
import AuthForm from './AuthForm';

class LoginForm extends Component {
  state = { errors: [] };

  onSubmit = ( email, password ) => {
    this.props.mutate( {
      variables: { email, password },
      refetchQueries: [{ query: FindCurrentUser }]
    } ).
         catch( e => {
           const errors = e.graphQLErrors.map( o => o.message );
           this.setState( { errors } );
         } );
  };

  componentWillUpdate( nextProps ) {
    if( !this.props.data.user && nextProps.data.user ) {
      // user went from not logged in, to logged in
      hashHistory.push( '/' );
    }
  }

  render() {
    return (
      <div className="container">
        <h3>Login</h3>
        <AuthForm authLabel="SignIn"
                  errors={this.state.errors}
                  onSubmit={this.onSubmit}/>
      </div>
    );
  }
}

export default graphql( FindCurrentUser )( graphql( LoginUser )( LoginForm ) );
