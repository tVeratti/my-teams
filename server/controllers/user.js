const authAPI = require('./../auth/helpers').authAPI;
const User = require('../models/User');

module.exports = app => {
  app.get('/api/user', authAPI, (req, res) => res.json(req.user));

  app.post('/api/user/teams', authAPI, (req, res) => {
    User.findById(req.user._id, (err, user) => {
      if (err) return res.send(err);
      user.teams = req.body.teams;
      user.save(err => {
        if (err) throw err;
        return res.send(user.teams);
      });
    });
  });
};
