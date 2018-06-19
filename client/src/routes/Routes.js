import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Login from '../login/Login';
import Games from '../games/Games';

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
                  {/* Routing Main Views */}
                  <Route exact path="/" component={Games} />
                  {/*<Route path="/site/:name" component={Site} />
                    <Route path="/asset/:id" component={Edit} />*/}
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

export default connect(state => state.user)(Routes);
