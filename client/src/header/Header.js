import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import xhr from 'xhr';

import userActions from '../user/Actions';
import gamesActions from '../games/Actions';

import './Header.scss';

class Header extends Component {
  curPath = () => location.pathname.split('/')[1] || '/';

  render() {
    const userNode = this.renderUser();

    return (
      <Menu fluid secondary>
        <Menu.Item active={this.curPath() === '/'}>
          <Link to="/">Games</Link>
        </Menu.Item>
        {this.renderUser()}
      </Menu>
    );
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(userActions.fetchUser());
    dispatch(gamesActions.fetchGames());
  }

  renderUser() {
    const { isAuthenticated, google } = this.props;

    if (!isAuthenticated) return;

    return [
      <Menu.Item key="1" active={this.curPath() === 'profile'}>
        <Link to="/profile">My Teams</Link>
      </Menu.Item>,
      <Menu.Item key="2" position="right">
        <a href="/logout">Log Out</a>
      </Menu.Item>
    ];
  }
}

export default withRouter(connect(state => state.user)(Header));
