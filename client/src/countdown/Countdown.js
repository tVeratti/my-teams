import React, { Component } from 'react';
import { Segment, Statistic, Label, Icon } from 'semantic-ui-react';
import moment from 'moment';

import './Countdown.scss';

export default class extends Component {
  componentDidMount() {
    this.interval = setInterval(() => this.forceUpdate(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  renderTick(value, label) {
    return (
      <Statistic inverted>
        <Statistic.Value>{value}</Statistic.Value>
        <Statistic.Label>{label}</Statistic.Label>
      </Statistic>
    );
  }

  render() {
    const { game } = this.props;
    if (!game) return <div />;

    const today = new Date().getTime();
    const date = new Date(`${game.date} ${game.time}`).getTime();

    const duration = moment.duration(date - today, 'milliseconds');

    return (
      <div className="countdown">
        <div>
          {this.renderTick(duration.days(), 'days')}
          {this.renderTick(duration.hours(), 'hours')}
          {this.renderTick(duration.minutes(), 'minutes')}
          {this.renderTick(duration.seconds(), 'seconds')}
        </div>
        <Label color="teal" pointing>
          <Icon name="time" />
          {game.home} vs. {game.away}
        </Label>
      </div>
    );
  }
}
