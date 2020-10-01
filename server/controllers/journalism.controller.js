const Journalism = require('../models/journalism.model');
const { verifyToken } = require('./token.controller');

function getAll(req, res, next) {
  Journalism.find()
    .then(journalism => res.json(journalism))
    .catch(err => next(err));
}

function createSingle(req, res, next) {
  const journalismObj = new Journalism({
    title: req.body.title,
    copy: req.body.copy,
    // imageUrl: req.body.imageUrl,
    image: req.body.image,
    releaseDate: req.body.releaseDate,
    externalLink: req.body.externalLink,
    createdAt: new Date()
  });
  verifyToken(req, res, next)
    .then(() => {
      journalismObj.save()
        .then((savedJournalism) => {
          res.json(savedJournalism);
        })
        .catch(e => next(e));
    });
}

/**
 * Load single journalism and append to req.
 */
function loadSingle(req, res, next, id) {
  Journalism.getSingle(id)
    .then((journalism) => {
      req.journalism = journalism; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

function getSingle(req, res) {
  return res.json(req.journalism);
}

function editSingle(req, res, next) {
  Journalism.edit(req.body)
    .then(savedJournalism => res.json(savedJournalism))
    .catch(e => next(e));
}

function removeSingle(req, res) {
  Journalism.findByIdAndRemove(req.params.journalismId, (err) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ message: 'Journalism article deleted' });
  });
}

module.exports = {
  getAll,
  createSingle,
  loadSingle,
  getSingle,
  editSingle,
  removeSingle
};
