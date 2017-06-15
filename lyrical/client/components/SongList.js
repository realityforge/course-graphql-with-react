import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import DeleteSong from '../queries/DeleteSong';
import FindAllSongs from '../queries/FindAllSongs';

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
    const { id, title } = song;
    return (
      <li key={id} className="collection-item">
        <Link to={`/songs/${id}`}>{title}</Link>
        <i
          className="material-icons right"
          onClick={e => this.onDeleteClick( id )}>
          delete
        </i>
      </li>
    );
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

  onDeleteClick( songId ) {
    this.props.mutate( { variables: { id: songId } } ).
         // using this.props.data.refetch() is an alternative way to bust the
         // cache. It causes a refetch of all queries associated with component.
         // We could use refetchQueries parameter to mutate to force refetch
         // This is good if there is multiple queries and is slightly easier to
         // use but does not handle the case when query is used by different
         // component
         then( () => this.props.data.refetch() );
  }
}

// This is very similar to HOC from react-redux
export default graphql( DeleteSong )( graphql( FindAllSongs )( SongList ) );
