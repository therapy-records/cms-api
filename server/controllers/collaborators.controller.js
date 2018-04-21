const Collaborators = require('../models/collaborators.model');
const tokenCtrl = require('./token.controller');

function getAll(req, res, next) {
  Collaborators.find()
    .then(collabs => res.json(collabs))
    .catch(err => next(err));
}

function createSingle(req, res, next) {
  const collaborator = new Collaborators({
    name: req.body.name,
    role: req.body.role,
    about: req.body.about,
    avatarUrl: req.body.avatarUrl,
    urls: req.body.urls,
    collabOn: req.body.collabOn
  });
  tokenCtrl.verifyToken(req, res, next)
    .then(() => {
      collaborator.save()
        .then((savedCollab) => {
          res.json(savedCollab);
        })
        .catch(e => next(e));
    });
}

/**
 * Load collab and append to req.
 */
function loadSingle(req, res, next, id) {
  Collaborators.getSingle(id)
    .then((collab) => {
      req.collab = collab; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

function getSingle(req, res) {
  return res.json(req.collab);
}

function editSingle(req, res, next) {
  Collaborators.edit(req.body)
    .then(savedCollab => res.json(savedCollab))
    .catch(e => next(e));
}

function removeSingle(req, res) {
  Collaborators.findByIdAndRemove(req.params.collaboratorId, (err) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ message: 'Collaborator deleted' });
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
