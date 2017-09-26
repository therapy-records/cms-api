import Collaborators from '../models/collaborators.model';

function getAll(req, res, next) {
  Collaborators.find()
    .then(collabs => res.json(collabs))
    .catch(err => next(err));
}

/**
 * Load news and append to req.
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

export default {
  getAll,
  loadSingle,
  getSingle,
  editSingle,
  removeSingle
};
