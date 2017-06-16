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
            onClick={ _ => this.onLike( id, likes ) }
          >
            thumb_up
          </i>
          {likes}
        </div>
      </li>
    );
  }

  onLike( lyricId, currentLikes ) {
    // This is a representation of what we think the response will look
    // like. Apollo will apply this to data store and re-render immediately.
    // It will then re-render with correct data when actual response returns
    // from the server.
    // The format of this is easiest to determine by just looking at what is
    // returned from the server. WIth enough understanding of graphql it is
    // also possible to guess structure from the request structure.
    const expectedResponse = {
      __typename: 'Mutation',
      likeLyric: {
        __typename: 'LyricType',
        id: lyricId,
        likes: currentLikes + 1
      }
    };
    this.props.mutate( {
      variables: {
        lyricId: lyricId
      },
      optimisticResponse: expectedResponse
    } );
  }
}

export default graphql( LikeLyric )( LyricList );
