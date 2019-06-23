const config = require('../../config/env');
const News = require('../models/news.model');
const Collaborators = require('../models/collaborators.model');
const Press = require('../models/press.model');
const Journalism = require('../models/journalism.model');

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


function deleteAllJournalism(req, res) {
  if (config.env === 'test') {
    Journalism.remove({}, (err, press) => {
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
  deleteAllJournalism
};
