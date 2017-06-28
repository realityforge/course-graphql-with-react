import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';
import FindCurrentUser from '../queries/FindCurrentUser';

export default ( WrappedComponent ) => {
  class RequireAuth extends Component {
    componentDidMount() {
      const props = this.props;
      if( !props.data.loading && !props.data.user ) {
        this.checkData( props );
      }
    }

    componentWillUpdate( nextProps ) {
      this.checkData( nextProps );
    }

    checkData( props ) {
      if( !props.data.loading && !props.data.user ) {
        hashHistory.push( '/signin' );
      }
    }

    render() {
      return <WrappedComponent {...this.props}/>;
    }
  }

  return graphql( FindCurrentUser )( RequireAuth );
}
