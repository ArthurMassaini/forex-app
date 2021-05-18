import React from 'react';
import { Redirect } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

import LoginForm from '../components/LoginForm';
import * as STORAGE from '../services/localStorage';

function Login() {
  if (STORAGE.getUser() !== null) {
    return <Redirect to="/" />;
  }

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
