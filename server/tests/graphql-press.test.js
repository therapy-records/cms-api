const mongoose = require('mongoose');
const request = require('supertest');
const httpStatus = require('http-status');
const chai = require('chai');
const config = require('../../config/env');
const app = require('../../index');

chai.config.includeStack = true;
const expect = chai.expect;

const MOCK = {
  AUTH_USER: {
    username: config.username,
    password: config.pword
  },
  PRESS_ARTICLE: {
    author: 'website.com',
    title: 'test title',
    excerpt: '<p>testing</p>',
    externalLink: 'article.com/test',
    releaseDate: 'date string'
  }
};

let JWT_VALID = '';
let PRESS_ARTICLE_ID = '';
let ALL_PRESS_ARTICLES = [];

after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## GraphQL - Press mutations/queries', () => {
  after((done) => {
    request(app)
      .delete('api/test/press')
      .then((err) => {
        if (err) {
          throw err;
        }
        done();
      });
    done();
  });

  describe('# POST /api/auth/login', () => {
    it('should return a JWT', (done) => {
      request(app)
        .post('/api/auth/login')
        .send(MOCK.AUTH_USER)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.token).to.be.a('string');
          JWT_VALID = res.body.token;
          done();
        });
    });
  });

  describe('graphql - create new press article', () => {
    it('should create new press', (done) => {
      request(app)
        .post('/graphql')
        .set('Authorization', JWT_VALID)
        .send({
          query: `mutation{ createPress(input: { author: "${MOCK.PRESS_ARTICLE.author}", title: "${MOCK.PRESS_ARTICLE.title}", excerpt: "${MOCK.PRESS_ARTICLE.excerpt}", externalLink: "${MOCK.PRESS_ARTICLE.externalLink}", releaseDate: "${MOCK.PRESS_ARTICLE.releaseDate}" }) {_id, author, title, excerpt, externalLink, releaseDate}}`
        })
        .expect(httpStatus.OK)
        .then((res) => {
          PRESS_ARTICLE_ID = res.body.data.createPress._id;
          expect(res.body.data.createPress).to.be.an('object');
          expect(res.body.data.createPress._id).to.be.a('string');
          expect(res.body.data.createPress.author).to.be.a('string');
          expect(res.body.data.createPress.author).to.eq(MOCK.PRESS_ARTICLE.author);
          expect(res.body.data.createPress.title).to.be.a('string');
          expect(res.body.data.createPress.title).to.eq(MOCK.PRESS_ARTICLE.title);
          expect(res.body.data.createPress.excerpt).to.be.a('string');
          expect(res.body.data.createPress.excerpt).to.eq(MOCK.PRESS_ARTICLE.excerpt);
          expect(res.body.data.createPress.externalLink).to.be.a('string');
          expect(res.body.data.createPress.externalLink).to.eq(MOCK.PRESS_ARTICLE.externalLink);
          expect(res.body.data.createPress.releaseDate).to.be.a('string');
          expect(res.body.data.createPress.releaseDate).to.eq(MOCK.PRESS_ARTICLE.releaseDate);
          done();
        });
    });
  });

  describe('graphql - get all press articles', () => {
    it('should return all press articles', (done) => {
      request(app)
        .post('/graphql')
        .set('Authorization', JWT_VALID)
        .send({
          query: 'query{press{_id, title, author, excerpt, externalLink, releaseDate}}'
        })
        .expect(httpStatus.OK)
        .then((res) => {
          ALL_PRESS_ARTICLES = res.body.data.press;
          expect(res.body.data.press).to.be.an('array');
          expect(res.body.data.press[0]._id).to.be.a('string');
          expect(res.body.data.press[0].author).to.be.a('string');
          expect(res.body.data.press[0].author).to.eq(MOCK.PRESS_ARTICLE.author);
          expect(res.body.data.press[0].title).to.be.a('string');
          expect(res.body.data.press[0].title).to.eq(MOCK.PRESS_ARTICLE.title);
          expect(res.body.data.press[0].excerpt).to.be.a('string');
          expect(res.body.data.press[0].excerpt).to.eq(MOCK.PRESS_ARTICLE.excerpt);
          expect(res.body.data.press[0].externalLink).to.be.a('string');
          expect(res.body.data.press[0].externalLink).to.eq(MOCK.PRESS_ARTICLE.externalLink);
          expect(res.body.data.press[0].releaseDate).to.be.a('string');
          expect(res.body.data.press[0].releaseDate).to.eq(MOCK.PRESS_ARTICLE.releaseDate);
          done();
        });
    });
  });

  describe('graphql - get single press article', () => {
    it('should return a press article by ID', (done) => {
      request(app)
        .post('/graphql')
        .set('Authorization', JWT_VALID)
        .send({
          query: `query{pressArticle(_id: "${PRESS_ARTICLE_ID}"){ _id, author, title, excerpt, externalLink, releaseDate}}`
        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.data.pressArticle).to.be.an('object');
          expect(res.body.data.pressArticle._id).to.be.a('string');
          expect(res.body.data.pressArticle.author).to.be.a('string');
          expect(res.body.data.pressArticle.author).to.eq(MOCK.PRESS_ARTICLE.author);
          expect(res.body.data.pressArticle.title).to.be.a('string');
          expect(res.body.data.pressArticle.title).to.eq(MOCK.PRESS_ARTICLE.title);
          expect(res.body.data.pressArticle.excerpt).to.be.a('string');
          expect(res.body.data.pressArticle.excerpt).to.eq(MOCK.PRESS_ARTICLE.excerpt);
          expect(res.body.data.pressArticle.externalLink).to.be.a('string');
          expect(res.body.data.pressArticle.externalLink).to.eq(MOCK.PRESS_ARTICLE.externalLink);
          expect(res.body.data.pressArticle.releaseDate).to.be.a('string');
          expect(res.body.data.pressArticle.releaseDate).to.eq(MOCK.PRESS_ARTICLE.releaseDate);
          done();
        });
    });
  });

  describe('graphql - edit press article', () => {
    it('should edit the article', (done) => {
      const edited = {
        author: 'new author',
        title: 'edited title',
        excerpt: 'new excerpt',
        releaseDate: 'edited date',
        externalLink: 'edited.com'
      };
      const lastCreatedPressArticle = ALL_PRESS_ARTICLES[ALL_PRESS_ARTICLES.length - 1];

      request(app)
        .post('/graphql')
        .set('Authorization', JWT_VALID)
        .send({
          query: `mutation{ editPress(_id: "${lastCreatedPressArticle._id}", input: { author: "${edited.author}", title: "${edited.title}", excerpt: "${edited.excerpt}", externalLink: "${edited.externalLink}", releaseDate: "${edited.releaseDate}" }) {_id, author, title, excerpt, externalLink, releaseDate}}`

        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.data.editPress).to.be.an('object');
          expect(res.body.data.editPress._id).to.be.a('string');
          expect(res.body.data.editPress.author).to.be.a('string');
          expect(res.body.data.editPress.author).to.eq(edited.author);
          expect(res.body.data.editPress.title).to.be.a('string');
          expect(res.body.data.editPress.title).to.eq(edited.title);
          expect(res.body.data.editPress.excerpt).to.be.a('string');
          expect(res.body.data.editPress.excerpt).to.eq(edited.excerpt);
          expect(res.body.data.editPress.externalLink).to.be.a('string');
          expect(res.body.data.editPress.externalLink).to.eq(edited.externalLink);
          expect(res.body.data.editPress.releaseDate).to.be.a('string');
          expect(res.body.data.editPress.releaseDate).to.eq(edited.releaseDate);
          done();
        });
    });
  });

  describe('graphql - delete press', () => {
    it('should delete press article', (done) => {
      const lastCreatedPressArticle = ALL_PRESS_ARTICLES[ALL_PRESS_ARTICLES.length - 1];

      request(app)
        .post('/graphql')
        .set('Authorization', JWT_VALID)
        .send({
          query: `mutation{ deletePress(_id: "${lastCreatedPressArticle._id}") {_id}}`
        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.data.deletePress).to.deep.eq({
            _id: lastCreatedPressArticle._id
          });
          done();
        });
    });
  });
});
