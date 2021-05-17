import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button, Form } from 'semantic-ui-react';

function RegisterForm() {
  const [formValues, setFormValues] = useState({ email: '', password: '' });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormValues({ ...formValues, [name]: value });
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
    <Form size="large">
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
      <br />
      <Link to="/register" className="link">
        New? Create an account
      </Link>
    </Form>
  );
}

export default RegisterForm;
