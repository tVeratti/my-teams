import React, { useState } from 'react';
import Router from 'next/router';
import { Auth } from 'aws-amplify';

import SignUpForm from '../src/authentication/signup';
import Verify from '../src/authentication/verify';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const onSignUp = async e => {
    e.preventDefault();
    try {
      await Auth.signUp({
        username,
        password,
        attributes: { email }
      });
    } catch (error) {
      console.log({ error });
    }
    setSubmitted(true);
  };

  const onVerify = async e => {
    e.preventDefault();
    await Auth.confirmSignUp(username, code);
    await Auth.signIn(username, password);
    Router.push('/');
  };

  const onResend = async e => Auth.resendSignUp(username);

  return (
    <div>
      {submitted && (
        <Verify
          onCodeChange={setCode}
          onVerify={onVerify}
          onResend={onResend}
        />
      )}
      {!submitted && (
        <SignUpForm
          onUsernameChange={setUsername}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onSignUp={onSignUp}
        />
      )}
    </div>
  );
};

export default Signup;
