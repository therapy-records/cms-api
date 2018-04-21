const config = require('../../config/env');
const News = require('../models/news.model');
const Collaborators = require('../models/collaborators.model');
const Press = require('../models/press.model');
const OtherWork = require('../models/otherWork.model');

function deleteAllNewsArticles(req, res) {
  if (config.env === 'test') {
    News.remove({}, (err, articles) => {
      if (err) {
        res.send(err);
      }
      res.json(articles);
    });
  }
}

function deleteAllCollaborators(req, res) {
  if (config.env === 'test') {
    Collaborators.remove({}, (err, collabs) => {
      if (err) {
        res.send(err);
      }
      res.json(collabs);
    });
  }
}

function deleteAllPress(req, res) {
  if (config.env === 'test') {
    Press.remove({}, (err, press) => {
      if (err) {
        res.send(err);
      }
      res.json(press);
    });
  }
}


function deleteAllOtherWork(req, res) {
  if (config.env === 'test') {
    OtherWork.remove({}, (err, press) => {
      if (err) {
        res.send(err);
      }
      res.json(press);
    });
  }
}

module.exports = {
  deleteAllNewsArticles,
  deleteAllCollaborators,
  deleteAllPress,
  deleteAllOtherWork
};
