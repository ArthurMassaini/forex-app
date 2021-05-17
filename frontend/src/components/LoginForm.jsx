import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react';

import CustomMessage from './CustomMessage';
import * as API from '../services/api';

function LoginForm() {
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const history = useHistory();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = formValues;

    const loginResponse = await API.fetchLogin(email, password);

    // if user exists, redirect to home/dashboard
    if (loginResponse.token) {
      history.push('/');
    } else {
      setMessage(loginResponse.message);
    }
  };

  const validateEmailAndPassword = () => {
    const { email, password } = formValues;

    const regexEmail = new RegExp('.+@[A-z]+[.](com|io)');
    const regexPassword = new RegExp('.{6}');

    if (regexEmail.test(email) && regexPassword.test(password)) {
      return true;
    }
    return false;
  };

  const renderButton = () => {
    if (validateEmailAndPassword()) {
      return <Button color="green">LOGIN</Button>;
    }
    return (
      <Button color="green" disabled>
        LOGIN
      </Button>
    );
  };

  return (
    <Form size="large" onSubmit={handleSubmit}>
      <Form.Input
        icon="user"
        iconPosition="left"
        type="text"
        placeholder="Email"
        name="email"
        value={formValues.email}
        onChange={handleChange}
      />
      <Form.Input
        icon="lock"
        iconPosition="left"
        type="password"
        placeholder="Password"
        name="password"
        value={formValues.password}
        onChange={handleChange}
      />
      {renderButton()}
      <br />
      {message !== '' && <CustomMessage>{message}</CustomMessage>}
      <br />
      <Link to="/register" className="link">
        New? Create an account
      </Link>
    </Form>
  );
}

export default LoginForm;
