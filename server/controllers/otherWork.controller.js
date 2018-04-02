import OtherWork from '../models/otherWork.model';
import { verifyToken } from './token.controller';

function getAll(req, res, next) {
  OtherWork.find()
    .then(otherWork => res.json(otherWork))
    .catch(err => next(err));
}

function createSingle(req, res, next) {
  const otherWorkObj = new OtherWork({
    title: req.body.title,
    copy: req.body.copy,
    mainImageUrl: req.body.mainImageUrl,
    releaseDate: req.body.releaseDate,
    externalLink: req.body.externalLink,
    createdAt: new Date()
  });
  verifyToken(req, res, next)
    .then(() => {
      otherWorkObj.save()
        .then((savedOtherWork) => {
          res.json(savedOtherWork);
        })
        .catch(e => next(e));
    });
}

/**
 * Load single other work and append to req.
 */
function loadSingle(req, res, next, id) {
  OtherWork.getSingle(id)
    .then((otherWork) => {
      req.otherWork = otherWork; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

function getSingle(req, res) {
  return res.json(req.otherWork);
}

function editSingle(req, res, next) {
  OtherWork.edit(req.body)
    .then(savedOtherWork => res.json(savedOtherWork))
    .catch(e => next(e));
}

function removeSingle(req, res) {
  OtherWork.findByIdAndRemove(req.params.otherWorkId, (err) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ message: 'Other Work article deleted' });
  });
}

export default {
  getAll,
  createSingle,
  loadSingle,
  getSingle,
  editSingle,
  removeSingle
};
