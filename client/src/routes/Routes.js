import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Login from '../login/Login';
import Games from '../games/Games';
import Profile from '../user/Profile';

import './Routes.scss';

const Routes = props => {
  const { isAuthenticated } = props;

  const currentKey = location.pathname.split('/')[1] || '/';

  return (
    <Route
      render={({ location }) => (
        <TransitionGroup className="routes__wrapper">
          <CSSTransition key={currentKey} timeout={200} classNames="fade">
            <div className="routes">
              {isAuthenticated ? (
                <Switch location={location}>
                  <Route exact path="/" component={Games} />
                  <Route path="/profile" component={Profile} />
                </Switch>
              ) : (
                <Login />
              )}
            </div>
          </CSSTransition>
        </TransitionGroup>
      )}
    />
  );
};

export default withRouter(connect(state => state.user)(Routes));
