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
  JOURNALISM_ARTICLE: {
    title: 'test 123',
    copy: 'test copy',
    imageUrl: 'images.com/me.jpg',
    externalLink: 'google.com',
    releaseDate: 'Mon Apr 02 2018 11:34:54 GMT+0100 (BST)'
  }
};


let JWT_VALID = '';

after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
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

describe('## GraphQL - Journalism queries', () => {
  after((done) => {
    request(app)
      .delete('api/test/journalism')
      .then((err) => {
        if (err) {
          throw err;
        }
        done();
      });
    done();
  });

  it('should create new journalism article', (done) => {
    request(app)
      .post('/api/journalism')
      .set('Authorization', JWT_VALID)
      .send(MOCK.JOURNALISM_ARTICLE)
      .expect(httpStatus.OK)
      .then((res) => {
        expect(res.body.title).to.equal(MOCK.JOURNALISM_ARTICLE.title);
        expect(res.body.copy).to.equal(MOCK.JOURNALISM_ARTICLE.copy);
        expect(res.body.imageUrl).to.deep.eq(MOCK.JOURNALISM_ARTICLE.imageUrl);
        expect(res.body.releaseDate).to.deep.eq(MOCK.JOURNALISM_ARTICLE.releaseDate);
        expect(res.body.createdAt).to.be.a('string');
        done();
      })
      .catch(done);
  });

  describe('graphql - get all journalism', () => {
    it('should return all articles', (done) => {
      request(app)
        .post('/graphql')
        .send({
          query: 'query{journalism{_id, title}}'
        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.data.journalism).to.be.an('array');
          expect(res.body.data.journalism[0]).to.be.an('object');
          expect(res.body.data.journalism[0]._id).to.be.a('string');
          expect(res.body.data.journalism[0].title).to.be.a('string');
          expect(res.body.data.journalism[0].title).to.eq(MOCK.JOURNALISM_ARTICLE.title);
          done();
        });
    });
  });
});
