import React, { Component } from 'react';

import styled from 'react-emotion';
import { Mutation } from 'react-apollo';

import { ADD_LOCATION_MUTATION } from '../graphql/mutations';
import { LOCATIONS_QUERY } from '../graphql/queries';

export default class AddLocation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
    };
  }

  onChange = event => {
    this.setState({ name: event.target.value });
  };

  render() {
    return (
      <Mutation
        mutation={ADD_LOCATION_MUTATION}
        refetchQueries={[{ query: LOCATIONS_QUERY }]}
      >
        {(addLocation, { loading, error, data }) => {
          if (error) {
            return 'Error';
          }

          return (
            <Form>
              <input
                type="text"
                placeholder="New location"
                value={this.state.name}
                onChange={this.onChange}
              />

              <button
                disabled={loading || this.state.name === ''}
                onClick={() => {
                  addLocation({
                    variables: {
                      input: this.state,
                    },
                  });

                  this.setState({
                    name: '',
                  });
                }}
              >
                {loading ? 'Loading' : 'Add'}
              </button>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

const Form = styled('form')`
  display: grid;
  grid-gap: 1em;

  grid-template-columns: 2fr 1fr;

  input,
  select {
    width: 100%;
    margin: 0;
  }
`;
