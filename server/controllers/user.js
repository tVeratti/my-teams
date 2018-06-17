const authAPI = require('./../auth/helpers').authAPI;

module.exports = app => {
  app.get('/api/user', authAPI, (req, res) => res.json(req.user));
};
