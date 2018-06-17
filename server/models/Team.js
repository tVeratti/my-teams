const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const team = new mongoose.Schema({
  name: String
});

module.exports = mongoose.model('Teams', team);
