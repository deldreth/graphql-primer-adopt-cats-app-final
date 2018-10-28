import React, { Component, lazy } from 'react';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { HashRouter, Route } from 'react-router-dom';
import styled from 'react-emotion';

const Locations = lazy(() => import('./containers/Locations'));
const Agency = lazy(() => import('./containers/Agency'));

const Client = new ApolloClient({
  uri: 'http://localhost:4000',
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={Client}>
        <HashRouter>
          <Grid>
            <Route key="locations" path="/" component={Locations} />
            <Route key="location" path="/location/:id" component={Agency} />
          </Grid>
        </HashRouter>
      </ApolloProvider>
    );
  }
}

export default App;

const Grid = styled('div')`
  display: grid;
  grid-template-columns: 1fr 2fr;
`;
