import React from 'react';
import { Grid } from 'semantic-ui-react';

import LoginForm from '../components/LoginForm';

function Login() {
  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 500 }}>
        <h1>Login</h1>
        <LoginForm />
      </Grid.Column>
    </Grid>
  );
}

export default Login;
