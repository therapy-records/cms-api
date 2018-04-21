/* istanbul ignore next */
const User = require('../server/models/user.model');
const config = require('./env');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

function pport(passport) {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = config.jwtSecret;
  passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
    User.findOne({ id: jwtPayload.sub }, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    });
  }));
}

module.exports = pport;
