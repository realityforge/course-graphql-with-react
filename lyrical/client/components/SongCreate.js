import gql from 'graphql-tag';
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory, Link } from 'react-router';

class SongCreate extends Component {
  constructor( props ) {
    super( props );

    this.state = { title: '', readOnly: false };
  }

  render() {
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>Create a new song</h3>
        <form onSubmit={e => this.onFormSubmit( e )}>
          <label>Title:</label>
          <input
            onChange={e => this.setState( { title: e.target.value } )}
            value={this.state.title}
            readOnly={this.state.readOnly}
          />
        </form>
      </div>
    );
  }

  onFormSubmit( event ) {
    event.preventDefault();
    this.setState( { readOnly: true } );

    // this.props.mutate is added by graphql HOC as the gql is a mutation
    this.props.mutate( {
      // This variable section lines up with variables declared in mutations
      // sans the $ prefix
      variables: {
        title: this.state.title
      },
      // Mutation changes state on the server but the client caches results
      // of queries. So to mark a query as requiring refresh/invalidate the
      // cache for that query requires that query registered in refetchQueries
      // below
      refetchQueries: []
    } ).then( () => hashHistory.push( '/' ) );
  }
}

const mutation = gql`
  mutation AddSong($title: String){
    addSong(title: $title) {
      title
    }
  }
`;

export default graphql( mutation )( SongCreate );
