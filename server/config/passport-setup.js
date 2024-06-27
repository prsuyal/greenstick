const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { createUser, findUserById } = require('../models/userModel');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/auth/google/redirect"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const newUser = await createUser(
      profile.emails[0].value,
      null,
      'google',
      profile.displayName,
      profile.displayName,
      null
    );
    done(null, newUser);
  } catch (err) {
    done(err, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await findUserById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
