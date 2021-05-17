import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react';

// import * as API from '../services/api';

function LoginForm() {
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  // const history = useHistory();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event) => {
    // event.preventDefault();
    // const { name, email, password } = formValues;

    // const registerResponse = await API.fetchRegister(name, email, password);
    // // setMessage(registerResponse.message);

    // // if user exists, redirect to login after two seconds
    // if (registerResponse.user) {
    //   const twoSeconds = 2000;
    //   setTimeout(() => {
    //     history.push('/');
    //   }, twoSeconds);
    // }
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
      <br />
      <Link to="/register" className="link">
        New? Create an account
      </Link>
    </Form>
  );
}

export default LoginForm;
