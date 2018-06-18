const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const game = new mongoose.Schema({
  index: String,
  date: String,
  time: String,
  home: String,
  away: String,
  status: String
});

module.exports = mongoose.model('Games', game);
