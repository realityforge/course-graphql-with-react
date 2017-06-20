import ApolloClient, { createNetworkInterface } from 'apollo-client';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import Header from './components/Header';

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
      <div>
        <Header/>
        Auth Starter
      </div>
    </ApolloProvider>
  );
};

ReactDOM.render( <Root />, document.querySelector( '#root' ) );
