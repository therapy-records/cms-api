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

/* istanbul ignore next */
function checkToken(req, res) {
  const token = getToken(req.headers);
  if (token) {
    const decoded = jwt.verify(token, config.secret); // check if this checks the expiry date
    return User.findOne({
      email: decoded._doc.email
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
  return res.status(403).send({ success: false, msg: 'No token provided.' });
}

export default {
  checkToken
};
