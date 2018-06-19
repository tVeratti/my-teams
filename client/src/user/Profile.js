import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown, Card, Button, Divider } from 'semantic-ui-react';
import memoize from 'memoize-one';

import { toOption } from '../utils/options';
import actions from './Actions';
import './Profile.scss';

class Profile extends Component {
  options = memoize(list => list.map(toOption));

  selectTeam = (e, { value }) => {
    const { dispatch } = this.props;
    dispatch(actions.modifyTeams(value, 'add'));
  };

  removeTeam = value => {
    const { dispatch } = this.props;
    dispatch(actions.modifyTeams(value, 'remove'));
  };

  renderControls = () => {
    const options = this.options(this.props.teams);
    return (
      <Dropdown
        fluid
        search
        button
        labeled
        className="icon"
        icon="plus"
        text="Add Team"
        options={options}
        onChange={this.selectTeam}
      />
    );
  };

  renderTeams = () => {
    const { teams = [] } = this.props.user;
    const cards = teams.map(t => {
      const removeButton = (
        <Button fluid negative onClick={this.removeTeam.bind(this, t)}>
          Remove
        </Button>
      );
      return <Card key={t} header={t} extra={removeButton} />;
    });

    return <Card.Group>{cards}</Card.Group>;
  };

  render() {
    return (
      <div className="profile">
        <h1>My Teams</h1>
        {this.renderControls()}
        <Divider hidden />
        {this.renderTeams()}
      </div>
    );
  }
}

export default connect(state => state)(Profile);
