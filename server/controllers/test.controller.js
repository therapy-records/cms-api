import config from '../../config/env';
import News from '../models/news.model';
import Collaborators from '../models/collaborators.model';
import Press from '../models/press.model';

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

export default {
  deleteAllNewsArticles,
  deleteAllCollaborators,
  deleteAllPress
};
