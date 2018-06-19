import { combineReducers, createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

import user from './user/Reducer';
import games from './games/Reducer';
import teams from './teams/Reducer';

const rootReducer = combineReducers({
  user,
  games,
  teams
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
