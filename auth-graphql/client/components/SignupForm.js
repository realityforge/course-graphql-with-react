import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';
import SignupUser from '../mutations/SignupUser';
import FindCurrentUser from '../queries/FindCurrentUser';
import AuthForm from './AuthForm';

class SignupForm extends Component {
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
        <h3>Sign up</h3>
        <AuthForm authLabel="SignUp"
                  errors={this.state.errors}
                  onSubmit={this.onSubmit}/>
      </div>
    );
  }
}

export default graphql( FindCurrentUser )( graphql( SignupUser )( SignupForm ) );
