import React, { memo } from 'react';

import { Query } from 'react-apollo';
import styled from 'react-emotion';
import { Link } from 'react-router-dom';

import { LOCATIONS_QUERY } from '../graphql/queries';
import AddLocation from './AddLocation';

function Locations(props) {
  return (
    <Container>
      <AddLocation />

      <Query query={LOCATIONS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) {
            return <p>Loading...</p>;
          }

          if (error) {
            return <p>Error!</p>;
          }

          return data.getLocations.map((location, index) => {
            return (
              <h5>
                <Link to={`/location/${location.id}`} key={index}>
                  {location.name}
                </Link>
              </h5>
            );
          });
        }}
      </Query>
    </Container>
  );
}

export default memo(Locations);

const Container = styled('div')`
  margin: 1em;
`;
