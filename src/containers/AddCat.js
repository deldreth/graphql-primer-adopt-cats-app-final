import React, { Component } from 'react';

import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { Mutation } from 'react-apollo';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { ADD_CAT_MUTATION } from '../graphql/mutations';

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
      <Mutation mutation={ADD_CAT_MUTATION}>
        {(addCat, { loading, error, data }) => {
          if (error) {
            return 'Error';
          }

          return (
            <Form>
              <StyledTextField
                fullWidth
                value={this.state.name}
                label="Name"
                onChange={this.onChange('name')}
              />

              <StyledTextField
                fullWidth
                value={this.state.breed}
                label="Breed"
                onChange={this.onChange('breed')}
              />

              <Button
                variant="contained"
                color="primary"
                disabled={loading || this.state.name === ''}
                onClick={() =>
                  addCat({
                    variables: {
                      locationId: this.props.locationId,
                      input: this.state,
                    },
                  })
                }
              >
                {loading ? 'Loading' : 'Add cat'}
              </Button>
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
  padding: 1em 24px 1em 24px;
  margin: 0 0 1em 0;
`;

const StyledTextField = styled(TextField)`
  margin: 0 0 1em 0;
`;
