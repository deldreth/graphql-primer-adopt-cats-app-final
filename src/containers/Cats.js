import React, { memo, Fragment } from 'react';

import { Query } from 'react-apollo';
import styled from 'react-emotion';

import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import { LOCATION_QUERY } from '../graphql/queries';
import AddCat from './AddCat';

function Cats(props) {
  return (
    <div>
      <AddCat locationId={props.match.params.id} />

      <Typography variant="h5">Cats at this location</Typography>

      <Query query={LOCATION_QUERY} variables={{ id: props.match.params.id }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <p>Loading...</p>;
          }

          if (error) {
            return <p>Error!</p>;
          }

          return (
            <List>
              {data.location.cats.map(cat => {
                return (
                  <ListItem>
                    <ListItemText primary={cat.name} />
                  </ListItem>
                );
              })}
            </List>
          );
        }}
      </Query>
    </div>
  );
}

export default memo(Cats);
