import React, { Component } from 'react';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { HashRouter, Route, Switch } from 'react-router-dom';
import styled from 'react-emotion';

import Locations from './containers/Locations';
import Cats from './containers/Cats';

const Client = new ApolloClient({
  uri: 'http://localhost:4000',
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={Client}>
        <HashRouter>
          <Switch>
            <Grid>
              <Route key="locations" path="/" component={Locations} />
              <Route key="location" path="/location/:id" component={Cats} />
            </Grid>
          </Switch>
        </HashRouter>
      </ApolloProvider>
    );
  }
}

export default App;

const Grid = styled('div')`
  display: grid;
  grid-gap: 1em;

  max-width: 768px;
  padding: 1em;
  grid-template-columns: repeat(2, 1fr);
`;
