import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react';

import CustomMessage from './CustomMessage';

import * as API from '../services/api';

function RegisterForm() {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const history = useHistory();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password } = formValues;

    const registerResponse = await API.fetchRegister(name, email, password);
    setMessage(registerResponse.message);

    // if user exists, redirect to login after two seconds
    if (registerResponse.user) {
      const twoSeconds = 2000;
      setTimeout(() => {
        history.push('/login');
      }, twoSeconds);
    }
  };

  const validateInputs = () => {
    const { name, email, password } = formValues;

    const regexEmail = new RegExp('.+@[A-z]+[.](com|io)');
    const regexPassword = new RegExp('.{6}');
    const regexName = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]{12,}$/;

    if (
      regexEmail.test(email)
      && regexPassword.test(password)
      && regexName.test(name)
    ) {
      return true;
    }
    return false;
  };

  const renderButton = () => {
    if (validateInputs()) {
      return <Button color="blue">REGISTER NOW</Button>;
    }
    return (
      <Button color="blue" disabled>
        REGISTER NOW
      </Button>
    );
  };

  return (
    <Form size="large" onSubmit={handleSubmit}>
      <Form.Input
        type="text"
        placeholder="Full Name"
        name="name"
        value={formValues.name}
        onChange={handleChange}
      />
      <Form.Input
        type="text"
        placeholder="Email"
        name="email"
        value={formValues.email}
        onChange={handleChange}
      />
      <Form.Input
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
      <Link to="/login" className="link">
        Already have an account? Log in
      </Link>
    </Form>
  );
}

export default RegisterForm;
