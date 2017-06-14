import ApolloClient from 'apollo-client';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import SongList from './components/SongList';

//ApolloClient assumes many things so do not need to configure it explicitly
// - i.e. it assumes a /graphql url
const client = new ApolloClient({});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <SongList/>
    </ApolloProvider>
  );
};

ReactDOM.render(
  <Root />,
  document.querySelector( '#root' )
);
