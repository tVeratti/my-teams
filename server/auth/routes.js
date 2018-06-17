module.exports = (app, passport) => {
  // Passport Authenticate
  // ------------------------------
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['email', 'profile']
    })
  );

  // Callback after google has authenticated the user.
  // ------------------------------
  app.get(
    '/auth/callback',
    passport.authenticate('google', {
      successRedirect: '/',
      failureRedirect: '/'
    })
  );

  // End session & logout
  // ------------------------------
  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
};
