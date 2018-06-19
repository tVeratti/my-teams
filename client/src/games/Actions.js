import xhr from 'xhr';

export default {
  fetchGames: function() {
    return dispatch => {
      xhr.get({ uri: '/api/games', json: true }, (err, res, games) => {
        dispatch(this.receiveGames(games));
      });
    };
  },
  receiveGames: function(games) {
    return { type: 'RECEIVE_GAMES', games };
  }
};
