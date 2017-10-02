import Press from '../models/press.model';
import { verifyToken } from './token.controller';

function getAll(req, res, next) {
  Press.find()
    .then(press => res.json(press))
    .catch(err => next(err));
}

function createSingle(req, res, next) {
  const press = new Press({
    author: req.body.author,
    copy: req.body.copy,
    mainImageUrl: req.body.mainImageUrl,
    externalLink: req.body.externalLink,
    createdAt: new Date()
  });
  verifyToken(req, res, next)
    .then(() => {
      press.save()
        .then((savedPress) => {
          res.json(savedPress);
        })
        .catch(e => next(e));
    });
}

/**
 * Load single press and append to req.
 */
function loadSingle(req, res, next, id) {
  Press.getSingle(id)
    .then((press) => {
      req.press = press; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

function getSingle(req, res) {
  return res.json(req.press);
}

function editSingle(req, res, next) {
  Press.edit(req.body)
    .then(savedPress => res.json(savedPress))
    .catch(e => next(e));
}

function removeSingle(req, res) {
  Press.findByIdAndRemove(req.params.pressId, (err) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ message: 'Press deleted' });
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
