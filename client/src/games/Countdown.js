import React, { Component } from 'react';
import { Card, Label } from 'semantic-ui-react';
import moment from 'moment';

export default class extends Component {
  componentDidMount() {
    this.interval = setInterval(() => this.forceUpdate(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { game } = this.props;
    if (!game) return <div />;

    const today = new Date().getTime();
    const date = new Date(`${game.date} ${game.time}`).getTime();

    const duration = moment.duration(date - today, 'milliseconds');

    return (
      <Label.Group color="orange" size="huge">
        <Label>{duration.days()}</Label>
        <Label>{duration.hours()}</Label>
        <Label>{duration.minutes()}</Label>
        <Label>{duration.seconds()}</Label>
      </Label.Group>
    );
  }
}
