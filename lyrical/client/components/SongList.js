import gql from 'graphql-tag';
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

class SongList extends Component {
  render() {
    return (
      <div>
        <h1>Song List</h1>
        {this.renderSongList()}
      </div>
    );
  }

  renderSongListItem( song ) {
    return <li key={song.id} className="collection-item">{song.title}</li>;
  }

  renderSongList() {
    //Could also use if( !this.props.data.songs ) {
    // however !this.props.data.loading is a little easier to understand
    if( this.props.data.loading ) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <ul className="collection">
          {this.props.data.songs.map( s => this.renderSongListItem( s ) )}
        </ul>
        <Link to="/songs/new" className="btn-floating btn-large red right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

// Definition of the query.
const query = gql`
{
  songs {
    id
    title
  }
}
`;

// This is very similar to HOC from react-redux
export default graphql( query )( SongList );
