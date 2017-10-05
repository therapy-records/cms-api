/* eslint object-shorthand: 0 */
import jwt from 'jsonwebtoken';
import config from '../../config/env';
import User from '../models/user.model';

/**
 * create user
 */

/* istanbul ignore next */
const getToken = (headers) => {
  if (headers && headers.authorization) {
    const parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    }
    return null;
  }
  return null;
};

// TODO: refactor checkToken and verifyToken
// one wants res.status response, other wants just return user.
// this is for auth check during POST'ing eg, other is for logging in.

/* istanbul ignore next */
function checkToken(req, res) {
  const token = getToken(req.headers);
  if (token) {
    const decoded = jwt.verify(token, config.jwtSecret); // check if this checks the expiry date
    if (decoded._doc.username !== config.validUn) {
      res.status(403).send({ success: false, message: 'User not found.' });
    }
    return User.findOne({
      username: decoded._doc.username
    }, (err, user) => {
      if (err) throw err;

      if (!user) {
        return res.status(403).send({ errorCheckingToken: true });
      }
      if (user) {
        return res.status(200).send({ success: true });
      }
      return err;
    });
  }
  return res.status(403).send({ success: false, message: 'No token provided.' });
}

/* istanbul ignore next */
export function verifyToken(req, res) {
  const token = getToken(req.headers);
  if (token) {
    const decoded = jwt.verify(token, config.jwtSecret); // check if this checks the expiry date
    if (decoded._doc.username !== config.validUn) {
      res.status(403).send({ success: false, message: 'User not found.' });
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
  return res.status(403).send({ success: false, message: 'No token provided.' });
}


export default checkToken;
