const User = require('../models/user.model');

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
  User.get(id)
    .then((user) => {
      req.user = user; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get user
 * @returns {User}
 */
function get(req, res) {
  return res.json(req.user);
}

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}

function create(req, res) {
  if (!req.body.username ||
      req.body.username !== config.validUn ||
      !req.body.password) {
    res.status(400).send({ success: false, message: 'Please provide username and password.' });
  } else {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password
    });
    return newUser.save((err) => {
      if (err) {
        res.status(400).send({ success: false, message: 'User already exists.' });
      }
      res.json({ success: true, message: 'Successful created a new user.' });
    });
  }
  return res.status(400).send({ success: false, message: 'Error.' });
}
*/

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}

function update(req, res, next) {
  const user = req.user;
  user.username = req.body.username;
  user.mobileNumber = req.body.mobileNumber;
  user.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
}
 */

/**
 * Delete user.
 * @returns {User}

function remove(req, res, next) {
  const user = req.user;
  user.remove()
    .then(deletedUser => res.json(deletedUser))
    .catch(e => next(e));
}
 */

module.exports = { load, get };
