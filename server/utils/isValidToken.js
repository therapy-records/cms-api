const jwt = require('jsonwebtoken');
const config = require('../../config/env');
const User = require('../models/user.model');
const { isValidUsername } = require('.');
const splitToken = require('./splitToken');

const throwError = () => new Error('Unauthorized');

async function isValidToken(token) {
  if (token) {
    const jwtToken = splitToken(token);

    return new Promise((resolve, reject) =>
      jwt.verify(jwtToken, config.jwtSecret, (err, decoded) => {
        if (err ||
          !isValidUsername(decoded._doc.username, config.validUn)) {
          return reject(throwError());
        }

        return User.findOne({
          username: decoded._doc.username
        }, (userErr, user) => {
          if (userErr) return reject(throwError());
          if (!user) {
            return reject(throwError());
          }
          if (user) {
            return resolve(true);
          }
          return reject(throwError());
        });
      })
    );
  }
  return throwError();
}

module.exports = isValidToken;
