import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import xhr from 'xhr';

import userActions from '../user/Actions';
import gamesActions from '../games/Actions';

import './Header.scss';

class Header extends Component {
  render() {
    const userNode = this.renderUser();

    return (
      <div className="header">
        <Link to="/">Home</Link>
        <div className="header__content">{userNode}</div>
      </div>
    );
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(userActions.fetchUser());
    dispatch(gamesActions.fetchGames())
  }

  renderUser() {
    const { isAuthenticated, google } = this.props;
    if (!isAuthenticated) return;

    return (
      <div>
        <Link to="/profile">{google.name}</Link>
        <a href="/logout">Log Out</a>
      </div>
    );
  }
}

export default connect(state => state.user)(Header);
