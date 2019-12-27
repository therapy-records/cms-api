const Gigs = require('../models/gigs.model');
const tokenCtrl = require('./token.controller');

function getAll(req, res, next) {
  Gigs.find()
    .then(gigs => res.json(gigs))
    .catch(err => next(err));
}

function createSingle(req, res, next) {
  const gig = new Gigs({
    title: req.body.title,
    location: req.body.location,
    venue: req.body.venue,
    date: req.body.date,
    ticketsUrl: req.body.ticketsUrl,
  });
  tokenCtrl.verifyToken(req, res, next)
    .then(() => {
      gig.save()
        .then((savedGig) => {
          res.json(savedGig);
        })
        .catch(e => next(e));
    });
}

/**
 * Load gig and append to req.
 */
function loadSingle(req, res, next, id) {
  Gigs.getSingle(id)
    .then((gig) => {
      req.gig = gig; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

function getSingle(req, res) {
  return res.json(req.gig);
}

function editSingle(req, res, next) {
  Gigs.edit(req.body)
    .then(savedGig => res.json(savedGig))
    .catch(e => next(e));
}

function removeSingle(req, res) {
  Gigs.findByIdAndRemove(req.params.gigId, (err) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ message: 'Gig deleted' });
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
