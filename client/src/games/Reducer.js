import { sortBy } from 'lodash';

const initialState = [];

function reducer(state = initialState, action) {
  let nextState = [...state];

  switch (action.type) {
    case 'RECEIVE_GAMES':
      if (Array.isArray(action.games)) {
        const games = action.games.map(parseGame);
        nextState = sortBy(games, ['date']);
      }
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
