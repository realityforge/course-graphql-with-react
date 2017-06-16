import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import LikeLyric from '../queries/LikeLyric';

class LyricList extends Component {
  render() {
    if( !this.props.lyrics ) {
      return <div>Loading...</div>;
    }
    return (
      <ul className="collection">
        {this.props.lyrics.map( l => this.renderLyric( l ) )}
      </ul>
    );
  }

  renderLyric( { id, content, likes } ) {
    return (
      <li key={id} className="collection-item">
        {content}
        <div className="vote-box">
          <i
            className="material-icons"
            onClick={ _ => this.onLike( id ) }
          >
            thumb_up
          </i>
          {likes}
        </div>
      </li>
    );
  }

  onLike( lyricId ) {
    this.props.mutate( {
      variables: {
        lyricId: lyricId
      }
    } );
  }
}

export default graphql( LikeLyric )( LyricList );
