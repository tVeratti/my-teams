module.exports = {
  clientID: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL:
    process.env.CALLBACK_URL || 'http://localhost:2018/auth/callback/'
};
