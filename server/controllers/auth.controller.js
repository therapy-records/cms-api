import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import User from '../models/user.model';
import config from '../../config/env';

const JWT_EXPIRY_DATE = '7 days';

// sample user, used for authentication
const user = {
  username: 'react',
  password: 'express'
};

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {
  // Ideally you'll fetch this from the db
  // Idea here was to show how jwt works with simplicity
  if (req.body.username === user.username && req.body.password === user.password) {
    const token = jwt.sign({
      username: user.username
    }, config.secret);
    return res.json({
      token,
      username: user.username
    });
  }

  const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED);
  return next(err);
}

/* istanbul ignore next */
function authCheck(req, res) {
  User.findOne({
    email: req.body.email
  }, (err, usr) => {
    if (err) throw err;

    if (!usr) {
      res.send({ success: false, msg: 'userNotFound' });
    } else {
      usr.comparePassword(req.body.password, (cPErr, isMatch) => {
        if (isMatch && !cPErr) {
          // eslint-disable-next-line consistent-return
          jwt.sign(usr, config.secret, { expiresIn: JWT_EXPIRY_DATE }, (jwtErr, token) => {
            if (jwtErr) {
              return jwtErr;
            }
            res.json({ success: true, token: `JWT ${token}`, userId: user._id });
          });
        } else {
          res.send({ success: false, msg: 'incorrectPassword' });
        }
      });
    }
  });
}

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function getRandomNumber(req, res) {
  // req.user is assigned by jwt middleware if valid token is provided
  return res.json({
    user: req.user,
    num: Math.random() * 100
  });
}

export default { login, authCheck, getRandomNumber };
