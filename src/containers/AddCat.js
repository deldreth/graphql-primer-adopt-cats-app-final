import React, { Component } from 'react';

import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { Mutation } from 'react-apollo';

import { ADD_CAT_MUTATION } from '../graphql/mutations';
import { LOCATION_QUERY } from '../graphql/queries';
import breeds from '../data/breeds';

export default class AddCat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      breed: '',
    };
  }

  onChange = field => event => {
    this.setState({ [field]: event.target.value });
  };

  render() {
    return (
      <Mutation
        mutation={ADD_CAT_MUTATION}
        refetchQueries={[
          { query: LOCATION_QUERY, variables: { id: this.props.locationId } },
        ]}
      >
        {(addCat, { loading, error, data }) => {
          if (error) {
            return 'Error';
          }

          return (
            <Form>
              <FormControl>
                <label>Name</label>
                <input
                  type="text"
                  value={this.state.name}
                  onChange={this.onChange('name')}
                />
              </FormControl>

              <FormControl>
                <label>Breed</label>
                <select
                  value={this.state.breed}
                  onChange={this.onChange('breed')}
                >
                  <option value="" />
                  {breeds.map(breed => {
                    return <option value={breed.value}>{breed.label}</option>;
                  })}
                </select>
              </FormControl>

              <button
                disabled={loading || this.state.name === ''}
                onClick={() => {
                  addCat({
                    variables: {
                      locationId: this.props.locationId,
                      input: this.state,
                    },
                  });

                  this.setState({
                    name: '',
                    breed: '',
                  });
                }}
              >
                {loading ? 'Loading' : 'Add cat'}
              </button>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

AddCat.propTypes = {
  locationId: PropTypes.string,
};

const Form = styled('form')`
  max-width: 50%;

  display: grid;
  grid-gap: 1em;

  grid-template-columns: repeat(2, 1fr);

  input,
  select {
    width: 100%;
    margin: 0;
  }
`;

const FormControl = styled('div')``;
