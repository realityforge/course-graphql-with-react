import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import AddLyric from '../queries/AddLyric';

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
    this.setState( { lyric: event.target.value } );
  }

  onSubmit() {
    this.setState( { readOnly: true } );

    this.props.mutate( {
      variables: {
        songId: this.props.songId,
        content: this.state.lyric
      }
    } ).then( () => {
      this.setState( { lyric: '', readOnly: false } );
    } );
  }
}

export default graphql( AddLyric )( LyricCreate );
