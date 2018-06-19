import { uniq } from 'lodash';

const initialState = [];

function reducer(state = initialState, action) {
  let nextState = [...state];

  switch (action.type) {
    case 'RECEIVE_GAMES':
      const homeTeams = action.games.map(g => g.home);
      const awayTeams = action.games.map(g => g.away);

      nextState = uniq([
        ...homeTeams,
        ...awayTeams
      ]);
      break;
  }
  return nextState;
}

function parseGame(game) {
  return {
    ...game,
    datetime: new Date(`${game.date} ${game.time}`)
  };
}

export default reducer;
