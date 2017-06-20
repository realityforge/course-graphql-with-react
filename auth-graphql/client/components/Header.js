import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import FindCurrentUser from '../queries/FindCurrentUser';

class Header extends Component {
  render() {
    if( this.props.data.loading ) {
      return <div></div>;
    }
    else if( this.props.data.user ) {
      return (
        <div>
          <button>Logout</button>
        </div>
      );
    }
    else {
      return (
        <div>
          <button>Sign up</button>
          <button>Sign In</button>
        </div>
      );
    }
  }
}

export default graphql( FindCurrentUser )( Header );
