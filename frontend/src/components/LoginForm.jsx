import React from 'react';

import {
  Button, Form, FormGroup, Label, Input,
} from 'reactstrap';

function LoginForm() {
  return (
    <Form row className="form-login" verticalAlign="center">
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="email" className="mr-sm-2">
          Email
        </Label>
        <Input
          type="email"
          name="email"
          placeholder="exemple@example.com"
        />
      </FormGroup>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="password" className="mr-sm-2">
          Password
        </Label>
        <Input
          type="password"
          name="password"
          placeholder="type your password"
        />
      </FormGroup>
      <br />
      <Button>Submit</Button>
    </Form>
  );
}

export default LoginForm;
