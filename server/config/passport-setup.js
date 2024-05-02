const passport = require('passport');
const GoogleStrategy = require('passport-google-auth20').Strategy;
const AppleStrategy = require('passport-apple');

const { createUser } = require('../models/userModel');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/redirect"
},
async(accessToken, refreshToken, profile, done) => {
    const newUser = await createUser(profile.emails[0].value, 'Google0AuthUser');
    done(null, newUser);
}));

passport.use(new AppleStrategy({
    clientID: process.env.APPLE_CLIENT_ID,
    teamID: process.env.APPLE_TEAM_ID,
    keyID: process.env.APPLE_KEY_ID,
    privateKeyLocation: process.env.APPLE_PRIVATE_KEY_PATH,
    callbackURL: "/api/auth/apple/redirect"
},
async (accessToken, refreshToken, idToken, profile, done) => {
    const email = idToken.email;
    const newUser = await createUser(email, 'Apple0AuthUser');
    done(null, newUser);
}));

module.exports = passport;