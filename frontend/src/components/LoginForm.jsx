import React from 'react';

import { Button, Form } from 'semantic-ui-react';

function LoginForm() {
  return (
    <Form size="large">
      <Form.Input
        icon="user"
        iconPosition="left"
        placeholder="Email"
        name="email"
        //   value={email}
        //   onChange={(e) => onInputChange(e)}
      />

      <Form.Input
        icon="lock"
        iconPosition="left"
        placeholder="Password"
        type="password"
        name="password"
        //   value={password}
        //   onChange={(e) => onInputChange(e)}
      />

      <Button
        color="green"
        //   onClick={() => onHandleSubmit()}
        //   disabled={validateInputs()}
      >
        LOGIN
      </Button>

      <Button
        color="gray"
        //   onClick={() => history.push('/register')}
      >
        I do not have an account yet
      </Button>
    </Form>
  );
}

export default LoginForm;
