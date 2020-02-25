import React from 'react';
import { TextField, Button } from '@material-ui/core';

const Verify = ({ onCodeChange, onVerify, onResend }) => (
  <form onSubmit={onVerify}>
    <TextField
      label="Verification Code"
      required
      onInput={e => onCodeChange(e.target.value)}
    />
    <Button type="submit">Verify</Button>
    <Button onClick={onResend}>Resend Verification</Button>
  </form>
);

export default Verify;
