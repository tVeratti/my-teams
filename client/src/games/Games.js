import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input } from 'semantic-ui-react';
import memoize from 'memoize-one';

import actions from './Actions';

import Game from './Game';

class Games extends Component {
  state = { filter: '' };

  filter = memoize((list, team) =>
    list.filter(game => {
      return (
        game.home.toLowerCase().includes(team) ||
        game.away.toLowerCase().includes(team)
      );
    })
  );

  updateFilter = ev => {
    this.setState({ filter: ev.target.value.toLowerCase() });
  };

  render() {
    const games = this.filter(this.props.games, this.state.filter);
    return (
      <div>
        <Input onChange={this.updateFilter} />
        <ul className="games">{games.map(g => <Game key={g._id} {...g} />)}</ul>
      </div>
    );
  }
}

export default connect(state => state)(Games);
