import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react';
import memoize from 'memoize-one';

import actions from './Actions';

import Game from './Game';
import Countdown from './Countdown';

class Games extends Component {
  filter = memoize((games, teams) => {
    let prevDate;

    return games
      .filter(game => {
        return (
          (teams.includes(game.home) || teams.includes(game.away)) &&
          game.status === 'Scheduled'
        );
      })
      .map(game => {
        const first = game.date !== prevDate;
        prevDate = game.date;
        return { ...game, first };
      });
  });

  updateFilter = ev => {
    this.setState({ filter: ev.target.value.toLowerCase() });
  };

  render() {
    const { games, user } = this.props;
    const myGames = this.filter(games, user.teams);

    return (
      <div>
        <h1>Games</h1>
        <Countdown game={myGames[0]} />
        <ul className="games">
          {myGames.map(g => <Game key={g._id} {...g} />)}
        </ul>
      </div>
    );
  }
}

export default connect(state => state)(Games);
