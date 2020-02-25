import React, { useState } from 'react';
import Router from 'next/router';
import { Auth } from 'aws-amplify';

import LoginForm from '../src/authentication/login';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async e => {
    e.preventDefault();
    try {
      await Auth.signIn(username, password);
      Router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LoginForm
      onLogin={onLogin}
      onUsernameChange={setUsername}
      onPasswordChange={setPassword}
    />
  );
};

export default Login;
