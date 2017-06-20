import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import FindCurrentUser from '../queries/FindCurrentUser';

class Header extends Component {
  renderButtons() {
    if( this.props.data.loading ) {
      return <div></div>;
    }
    else if( this.props.data.user ) {
      return (
        <div>
          <button>Logout</button>
        </div>
      );
    }
    else {
      return (
        <div>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/signin">Login</Link>
          </li>
        </div>
      );
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="left brand-logo">Home</Link>
          <ul className="right">
            {this.renderButtons()}
          </ul>
        </div>
      </nav>
    );
  }
}

export default graphql( FindCurrentUser )( Header );
