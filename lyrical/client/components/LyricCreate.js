import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import AddLyric from '../queries/AddLyric';
import FindSongByID from '../queries/FindSongByID';

class LyricCreate extends Component {
  constructor( props ) {
    super( props );
    this.state = { lyric: '', readOnly: false };
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind( this )}>
        <label>Add a Lyric</label>
        <input value={this.state.lyric}
               onChange={ e => this.onChange( e )}
               readOnly={this.state.readOnly}/>
      </form>
    );
  }

  onChange( event ) {
    event.preventDefault();
    this.setState( { lyric: event.target.value } );
  }

  onSubmit() {
    this.setState( { readOnly: true } );

    // Rather than using refetchQueries we just use data returned from mutate
    // to update cache. This is done by ensuring that every object has id
    // resolvable. See dataIdFromObject parameter when creating ApolloClient
    this.props.mutate( {
      variables: {
        songId: this.props.songId,
        content: this.state.lyric
      }
/*
      ,
      refetchQueries: [{
        query: FindSongByID,
        variables: { id: this.props.songId }
      }]
*/
    } ).then( () => {
      this.setState( { lyric: '', readOnly: false } );
    } );
  }
}

export default graphql( AddLyric )( LyricCreate );
