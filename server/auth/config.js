const OAuth2Strategy = require('passport-google-oauth').OAuth2Strategy;
const googleAuth = require('./google');

const User = require('./../models/User');

module.exports = passport => {
  // Used to serialize the user for the session.
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Used to deserialize the user.
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use(
    new OAuth2Strategy(googleAuth, (token, refreshToken, profile, done) => {
      // Make the code asynchronous.
      // User.findOne won't fire until we have all our data back from Google
      process.nextTick(function() {
        var query = { 'google.id': profile.id };
        var upsert = {
          'google.id': profile.id,
          'google.name': profile.displayName,
          'google.email': profile.emails[0].value,
          'google.token': token
        };
        var options = { upsert: true, new: true };

        User.findOneAndUpdate(query, upsert, options, (err, doc) => {
          if (err) return done(err);

          const user = doc || new User();

          if (!doc) {
            // New user - add google profile data.
            user.google.id = profile.id;
            user.google.token = token;
            user.google.name = profile.displayName;
            user.google.email = profile.emails[0].value;
          }

          user.lastActive = Date.now();

          // Save/Update the user's data
          user.save(err => {
            if (err) throw err;
            return done(null, user);
          });
        });
      });
    })
  );
};
