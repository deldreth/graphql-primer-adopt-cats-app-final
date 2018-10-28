import gql from 'graphql-tag';

export const ADD_CAT_MUTATION = gql`
  mutation addCat($locationId: ID!, $input: CatInput) {
    addCat(locationId: $locationId, input: $input) {
      id
      name
      age
      weight
      breed
    }
  }
`;

export const ADD_LOCATION_MUTATION = gql`
  mutation addLocation($input: LocationInput) {
    addLocation(input: $input) {
      id
      name
    }
  }
`;
