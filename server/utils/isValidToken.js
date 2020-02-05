const jwt = require('jsonwebtoken');
const config = require('../../config/env');
const User = require('../models/user.model');
const { isValidUsername } = require('.');

const splitToken = (token) => {
  const parted = token.split(' ');
  if (parted.length === 2) {
    return parted[1];
  }
  return null;
};

const throwError = () => new Error('Unauthorized');

async function isValidToken(token) {
  if (token) {
    let decodedObj;
    const theToken = splitToken(token);

    return new Promise((resolve, reject) =>
      jwt.verify(theToken, config.jwtSecret, (err, decoded) => {
        if (err ||
          !isValidUsername(decoded._doc.username, config.validUn)) {
          return reject(throwError());
        }
        decodedObj = decoded;

        return User.findOne({
          username: decodedObj._doc.username
        }, (userErr, user) => {
          if (userErr) return reject(throwError());
          if (!user) {
            return reject(throwError());
          }
          if (user) {
            return resolve(true);
          }
          return err;
        });
      })
    );
  }
  return throwError();
}

module.exports = isValidToken;
