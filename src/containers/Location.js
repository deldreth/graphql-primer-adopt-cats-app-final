import React, { memo, Fragment } from 'react';

import { Query } from 'react-apollo';
import styled from 'react-emotion';

import { LOCATION_QUERY } from '../graphql/queries';
import AddCat from './AddCat';

function Location(props) {
  return (
    <Query query={LOCATION_QUERY} variables={{ id: props.match.params.id }}>
      {({ loading, error, data }) => {
        if (loading) {
          return <p>Loading...</p>;
        }

        if (error) {
          return <p>Error!</p>;
        }

        return (
          <Container>
            <h1>{data.location.name}</h1>

            <AddCat locationId={props.match.params.id} />

            {data.location.cats &&
              data.location.cats.length > 0 && (
                <Fragment>
                  <hr />
                  <h2>Cats at this location</h2>

                  <Cats>
                    {data.location.cats.map((cat, index) => {
                      return (
                        <Cat key={index}>
                          <h5>{cat.name}</h5>

                          <p>{cat.breed}</p>
                        </Cat>
                      );
                    })}
                  </Cats>
                </Fragment>
              )}
          </Container>
        );
      }}
    </Query>
  );
}

export default memo(Location);

const Container = styled('div')`
  padding: 1em;
  border-left: 1px solid #efefef;
`;

const Cats = styled('div')`
  display: grid;
  grid-gap: 1em;

  grid-template-columns: repeat(1, 1fr);

  @media (min-width: 400px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 750px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Cat = styled('div')`
  border: 1px solid #efefef;
  padding: 1em;
`;
