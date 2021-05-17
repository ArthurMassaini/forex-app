import React from 'react';
import { Grid } from 'semantic-ui-react';

import RegisterForm from '../components/RegisterForm';

function Register() {
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
