import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button, Form } from 'semantic-ui-react';

function RegisterForm() {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormValues({ ...formValues, [name]: value });
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
    <Form size="large">
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
      <br />
      <Link to="/login" className="link">
        Already have an account? Log in
      </Link>
    </Form>
  );
}

export default RegisterForm;
