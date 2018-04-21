const Promise = require('bluebird');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

const Schema = mongoose.Schema; // eslint-disable-line no-unused-vars

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
UserSchema.pre('save', function preSave(next) {
  const user = this;
  if (!user) return next();
  return bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    return bcrypt.hash(user.password, salt, null, (hashErr, hash) => {
      if (hashErr) return next(hashErr);
      user.password = hash;
      return next();
    });
  });
});

/* istanbul ignore next */
UserSchema.methods.comparePassword = function comparePassword(passw, cb) {
  const hash = this.password;
  bcrypt.compare(passw, hash, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    return cb(null, isMatch);
  });
};

/**
 * Statics
 */
UserSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  }
};

/**
 * @typedef User
 */
module.exports = mongoose.model('User', UserSchema);
