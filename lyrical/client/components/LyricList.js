import React, { Component } from 'react';

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

  renderLyric( { id, content } ) {
    return (
      <li key={id} className="collection-item">
        {content}
      </li>
    );
  }
}

export default LyricList;
