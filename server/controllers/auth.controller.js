import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import config from '../../config/env';

const JWT_EXPIRY_DATE = '7 days';

/* istanbul ignore next */
function getAuthToken(req, res) {
  return User.findOne({
    username: req.body.username
  }, (err, usr) => {
    if (err) throw err;

    if (!usr) {
      res.json({ success: false, msg: 'userNotFound' });
    } else {
      usr.comparePassword(req.body.password, (cPErr, isMatch) => {
        if (isMatch && !cPErr) {
          // eslint-disable-next-line consistent-return
          jwt.sign(usr, config.secret, { expiresIn: JWT_EXPIRY_DATE }, (jwtErr, token) => {
            if (jwtErr) {
              return jwtErr;
            }
            res.json({ success: true, token: `JWT ${token}`, userId: usr._id });
          });
        } else {
          res.json({ success: false, msg: 'incorrectPassword' });
        }
      });
    }
  });
}

export default { getAuthToken };
