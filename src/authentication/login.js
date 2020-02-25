import React from 'react';
import { TextField, Button } from '@material-ui/core';

const Login = ({ onLogin, onUsernameChange, onPasswordChange }) => (
  <form onSubmit={onLogin}>
    <TextField
      label="Username"
      onInput={e => onUsernameChange(e.target.value)}
    />
    <TextField
      label="Password"
      type="password"
      onInput={e => onPasswordChange(e.target.value)}
    />
    <Button type="submit">Log In</Button>
    <Button href="/signup">Sign Up</Button>
  </form>
);

export default Login;
