import ApolloClient from 'apollo-client';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import { hashHistory, IndexRoute, Route, Router } from 'react-router';
import App from './components/App';
import SongCreate from './components/SongCreate';
import SongDetail from './components/SongDetail';
import SongList from './components/SongList';
import './style/style.css';

//ApolloClient assumes many things so do not need to configure it explicitly
// - i.e. it assumes a /graphql url
const client = new ApolloClient( {} );

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={SongList}/>
          <Route path="/songs/new" component={SongCreate}/>
          <Route path="/songs/:id" component={SongDetail}/>
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(
  <Root />,
  document.querySelector( '#root' )
);
