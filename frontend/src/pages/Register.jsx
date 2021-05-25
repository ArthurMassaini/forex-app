import React from 'react';
import { Redirect } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

import RegisterForm from '../components/RegisterForm';
import * as STORAGE from '../utils/localStorage';

function Register() {
  if (STORAGE.getUser() !== null) {
    return <Redirect to="/" />;
  }

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 500 }}>
        <h1>Register</h1>
        <RegisterForm />
      </Grid.Column>
    </Grid>
  );
}

export default Register;
