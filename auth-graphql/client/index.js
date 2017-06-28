import ApolloClient, { createNetworkInterface } from 'apollo-client';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import { hashHistory, IndexRoute, Route, Router } from 'react-router';
import App from './components/App';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Welcome from './components/Welcome';
import './style.css';

const networkInterface = createNetworkInterface( {
  uri: '/graphql',
  opts: {
    credentials: 'same-origin'
  }
} );

const client = new ApolloClient( {
  dataIdFromObject: o => o.id,
  networkInterface
} );

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Welcome}/>
          <Route path="/signin" component={LoginForm}/>
          <Route path="/signup" component={SignupForm}/>
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render( <Root />, document.querySelector( '#root' ) );
