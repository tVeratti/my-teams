import React, { Component } from 'react';
import { connect } from 'react-redux';
import xhr from 'xhr';

import actions from '../user/Actions';

import './Header.scss';

class Header extends Component {
  render() {
    const userNode = this.renderUser();

    return (
      <div className="header">
        <div className="header__content">{userNode}</div>
      </div>
    );
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(actions.fetchUser());
  }

  renderUser() {
    const { isAuthenticated, google } = this.props;
    if (!isAuthenticated) return;

    return (
      <div>
        {google.name}
        <a href="/logout">Log Out</a>
      </div>
    );
  }
}

export default connect(state => state.user)(Header);
