import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';

import Header from './header/Header';
import Routes from './routes/Routes';

import './App.scss';

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="app">
          <Header />
          <Routes />
        </div>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
