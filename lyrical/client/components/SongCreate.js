import gql from 'graphql-tag';
import React, { Component } from 'react';
import { graphql } from 'react-apollo';

class SongCreate extends Component {
  constructor( props ) {
    super( props );

    this.state = { title: '', readOnly: false };
  }

  render() {
    return (
      <div>
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
