import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import FindSongByID from '../queries/FindSongByID';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

class SongDetail extends Component {
  render() {
    const song = this.props.data.song;
    if( !song ) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>{song.title}</h3>
        <LyricList songId={song.id} lyrics={song.lyrics}/>
        <LyricCreate songId={song.id}/>
      </div>
    );
  }
}

export default graphql( FindSongByID, {
    options: ( props ) => {
      return { variables: { id: props.params.id } };
    }
  }
)( SongDetail );
