/* eslint object-shorthand: 0 */
const jwt = require('jsonwebtoken');
const config = require('../../config/env');
const User = require('../models/user.model');
const { isValidUsername } = require('../utils');
const splitToken = require('../utils/splitToken');

// TODO: refactor checkToken and verifyToken
// one wants res.status response, other wants just return user.
// this is for auth check during POST'ing eg, other is for logging in.

/* istanbul ignore next */
function checkToken(req, res) {
  const token = splitToken(req.headers.authorization);
  if (token) {
    let decodedObj;
    // TODO: ensure expiry date checks
    return jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err ||
          !isValidUsername(decoded._doc.username, config.validUn)) {
        return res.status(403).send({ success: false, message: 'Invalid username or password' });
      }
      decodedObj = decoded;

      return User.findOne({
        username: decodedObj._doc.username
      }, (userErr, user) => {
        if (userErr) throw userErr;
        if (!user) {
          return res.status(403).send({ errorCheckingToken: true });
        }
        if (user) {
          return res.status(200).send({ success: true });
        }
        return err;
      });
    });
  }
  return res.status(403).send({ success: false, message: 'No token provided' });
}

/* istanbul ignore next */
function verifyToken(req, res) {
  const token = splitToken(req.headers.authorization);
  if (token) {
    const decoded = jwt.verify(token, config.jwtSecret); // TODO: ensure expiry date checks
    if (!isValidUsername(decoded._doc.username, config.validUn)) {
      res.status(403).send({ success: false, message: 'Invalid username or password' });
    }
    return User.findOne({
      username: decoded._doc.username
    }, (err, user) => {
      if (err) throw err;

      if (!user) {
        return res.status(403).send({ errorCheckingToken: true });
      }
      if (user) {
        return user;
      }
      return err;
    });
  }
  return res.status(403).send({ success: false, message: 'No token provided' });
}


module.exports = {
  checkToken,
  verifyToken
};
