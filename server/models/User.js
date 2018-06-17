const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new mongoose.Schema({
  google: {
    id: String,
    token: String,
    email: String,
    name: String
  },
  created: { type: Date, default: Date.now() },
  lastActive: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Users', user);
