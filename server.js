// taskkill /f /im node.exe

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(express.static('dist'));

const sess = {
  secret: 'mytms',
  resave: false,
  saveUninitialized: true,
  cookie: {}
};

// if (process.env.NODE_ENV === 'production') {
//   app.use(enforce.HTTPS({ trustProtoHeader: true }));
//   app.set('trust proxy', 1);
//   sess.cookie.secure = true;
// }

app.use(session(sess));

// Authentication
// =========================================
require('./server/auth/config')(passport);
app.use(passport.initialize());
app.use(passport.session());

require('./server/auth/routes')(app, passport);

// Connect to MongoDb
// =========================================
const url =
  process.env.MONGOD_LOGIN +
  'cluster0-shard-00-00-2omka.mongodb.net:27017,' +
  'cluster0-shard-00-01-2omka.mongodb.net:27017,' +
  'cluster0-shard-00-02-2omka.mongodb.net:27017/my-teams' +
  '?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';

mongoose.connect(url);

// API
// =========================================
require('./server/controllers/user')(app);
require('./server/controllers/games')(app);
require('./server/controllers/scraper')(app);

// Catch-all route to server index and allow client-side
// routing to handle all client-side routes.
app.get('*', (req, res, next) => {
  if (req.isAuthenticated()) {
    // Authenticated.
    if (req.xhr) return next();
    else return res.sendFile(__dirname + '/dist/index.html');
  } else {
    // No Authenticated.
    if (req.xhr) return res.sendStatus(401);
    else return res.sendFile(__dirname + '/dist/index.html');
  }
});

// Go.
// =========================================
app.listen(process.env.PORT || 2018);
