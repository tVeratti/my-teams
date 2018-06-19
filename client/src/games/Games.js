import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import memoize from 'memoize-one';

import actions from './Actions';

import Game from './Game';

class Games extends PureComponent {
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

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(actions.fetchGames());
  }

  render() {
    const games = this.filter(this.props.games, this.state.filter);
    return (
      <div>
        <input onChange={this.updateFilter} />
        <ul className="games">{games.map(g => <Game key={g._id} {...g} />)}</ul>
      </div>
    );
  }
}

export default connect(state => state)(Games);
