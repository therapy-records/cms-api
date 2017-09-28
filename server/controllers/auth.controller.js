import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import config from '../../config/env';

const JWT_EXPIRY_DATE = '7 days';

/* istanbul ignore next */
function createAuthToken(req, res) {
  return User.findOne({
    username: req.body.username
  }, (err, usr) => {
    if (err) throw err;
    if (!usr || usr.username !== config.validUn) {
      res.status(401).send({ success: false, msg: 'userNotFound' });
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
          res.send({ success: false, msg: 'incorrectPassword' });
        }
      });
    }
  });
}

export default createAuthToken;
