import { combineReducers, createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

import user from './user/Reducer';
import games from './games/Reducer';

const rootReducer = combineReducers({
  user,
  games
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
