const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const config = require('../../config/env');
const { isValidUsername } = require('../utils');

const JWT_EXPIRY_DATE = '7 days';

/* istanbul ignore next */
function createAuthToken(req, res) {
  return User.findOne({
    username: req.body.username
  }, (err, usr) => {
    if (err) throw err;
    if (!usr || !isValidUsername(usr.username, config.validUn)) {
      res.status(401).send({ success: false, message: 'Invalid username or password' });
    } else {
      usr.comparePassword(req.body.password, (cPErr, isMatch) => {
        if (isMatch && !cPErr) {
          // eslint-disable-next-line consistent-return
          jwt.sign(usr, config.jwtSecret, { expiresIn: JWT_EXPIRY_DATE }, (jwtErr, token) => {
            if (jwtErr) {
              return jwtErr;
            }
            res.send({ success: true, token: `JWT ${token}`, userId: usr._id });
          });
        } else {
          res.status(401).send({ success: false, message: 'Invalid username or password' });
        }
      });
    }
  });
}

module.exports = { createAuthToken };
