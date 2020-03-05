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
          expect(res.body.data.press).to.be.an('object');
          expect(res.body.data.press._id).to.be.a('string');
          expect(res.body.data.press.author).to.be.a('string');
          expect(res.body.data.press.author).to.eq(MOCK.PRESS_ARTICLE.author);
          expect(res.body.data.press.title).to.be.a('string');
          expect(res.body.data.press.title).to.eq(MOCK.PRESS_ARTICLE.title);
          expect(res.body.data.press.excerpt).to.be.a('string');
          expect(res.body.data.press.excerpt).to.eq(MOCK.PRESS_ARTICLE.excerpt);
          expect(res.body.data.press.externalLink).to.be.a('string');
          expect(res.body.data.press.externalLink).to.eq(MOCK.PRESS_ARTICLE.externalLink);
          expect(res.body.data.press.releaseDate).to.be.a('string');
          expect(res.body.data.press.releaseDate).to.eq(MOCK.PRESS_ARTICLE.releaseDate);
          done();
        });
    });
  });
});
