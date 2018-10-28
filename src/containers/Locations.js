import React, { memo } from 'react';

import { Query } from 'react-apollo';

import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';

import { LOCATIONS_QUERY } from '../graphql/queries';

import { Link } from 'react-router-dom';

function Locations(props) {
  return (
    <Paper>
      <Query query={LOCATIONS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) {
            return <p>Loading...</p>;
          }

          if (error) {
            return <p>Error!</p>;
          }

          return (
            <List>
              {data.getLocations.map(location => {
                return (
                  <ListItemLink to={`/location/${location.id}`}>
                    <ListItemText primary={location.name} />
                  </ListItemLink>
                );
              })}
            </List>
          );
        }}
      </Query>
    </Paper>
  );
}

function ListItemLink(props) {
  return <MenuItem button component={Link} {...props} />;
}

export default memo(Locations);
