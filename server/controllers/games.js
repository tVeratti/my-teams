const authAPI = require('./../auth/helpers').authAPI;
const Game = require('./../models/Game');

module.exports = app => {
  app.get('/api/games', authAPI, (req, res) => {
    Game.find({}, (err, games) => {
      res.json(games);
    });
  });
};
