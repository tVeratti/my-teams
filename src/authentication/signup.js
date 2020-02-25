import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';

const Signup = ({
  onSignUp,
  onUsernameChange,
  onEmailChange,
  onPasswordChange
}) => (
  <form onSubmit={onSignUp}>
    <TextField
      label="Username"
      required
      onChange={e => onUsernameChange(e.target.value)}
    />
    <TextField
      label="Email"
      type="email"
      required
      onChange={e => onEmailChange(e.target.value)}
    />
    <TextField
      label="Password"
      type="password"
      required
      onChange={e => onPasswordChange(e.target.value)}
    />
    <Button type="submit">Sign Up</Button>
  </form>
);

export default Signup;
