import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Step, Header, Divider, Label } from 'semantic-ui-react';
import memoize from 'memoize-one';
import { uniq } from 'lodash';

import actions from './Actions';

import Game from './Game';
import Countdown from '../countdown/Countdown';

class Games extends Component {
  dates = games => uniq(games.map(g => g.date));

  filter = memoize((games, teams) =>
    games
      .map(game => {
        return {
          ...game,
          isHome: teams.includes(game.home),
          isAway: teams.includes(game.away)
        };
      })
      .filter(game => {
        return (game.isHome || game.isAway) && game.datetime > new Date();
      })
  );

  updateFilter = ev => {
    this.setState({ filter: ev.target.value.toLowerCase() });
  };

  renderGroups = myGames => {
    const countdownId = myGames[0]._id;

    // Group all games by date.
    const dateGroups = this.dates(myGames).map(date => {
      const games = myGames.filter(g => g.date === date);
      return { date, games };
    });

    // Render date groups together as steps.
    return dateGroups.map(group => {
      const gameSteps = group.games.map((g, i) => (
        <Game key={g._id} {...g} countdown={g._id === countdownId} />
      ));

      return (
        <div>
          <Header inverted>{group.date}</Header>
          <Step.Group fluid key={group.date}>
            {gameSteps}
          </Step.Group>
          <Divider hidden />
        </div>
      );
    });
  };

  render() {
    const { games, user } = this.props;

    const myGames = this.filter(games, user.teams);

    return (
      <div>
        <Header inverted textAlign="center" size="huge">
          Schedule
        </Header>
        <Countdown game={myGames[0]} />
        <Divider hidden />
        {myGames.length && this.renderGroups(myGames)}
      </div>
    );
  }
}

export default connect(state => state)(Games);
