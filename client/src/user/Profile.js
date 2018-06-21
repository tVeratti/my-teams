import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Dropdown,
  Card,
  Button,
  Divider,
  Segment,
  Header
} from 'semantic-ui-react';
import memoize from 'memoize-one';

import { toOption } from '../utils/options';
import actions from './Actions';
import './Profile.scss';

class Profile extends Component {
  selectTeam = (e, { value }) => {
    const { dispatch } = this.props;
    dispatch(actions.modifyTeams(value, 'add'));
  };

  removeTeam = value => {
    const { dispatch } = this.props;
    dispatch(actions.modifyTeams(value, 'remove'));
  };

  renderControls = () => {
    const options = this.props.teams.map(toOption);
    return (
      <Dropdown
        fluid
        selection
        search
        placeholder="Add Team"
        options={options}
        onChange={this.selectTeam}
      />
    );
  };

  renderTeams = () => {
    const { teams = [] } = this.props.user;
    const cards = teams.map(t => {
      const removeButton = (
        <Button fluid onClick={this.removeTeam.bind(this, t)}>
          Remove
        </Button>
      );
      return (
        <Card key={t}>
          <Card.Content>
            <Card.Header>{t}</Card.Header>
            <Divider hidden />
            <Card.Description>{removeButton}</Card.Description>
          </Card.Content>
        </Card>
      );
    });

    return <Card.Group>{cards}</Card.Group>;
  };

  render() {
    return (
      <div>
        <Header inverted textAlign="center" size="huge">
          Teams
        </Header>
        <Segment>{this.renderControls()}</Segment>
        {this.renderTeams()}
      </div>
    );
  }
}

export default connect(state => state)(Profile);
