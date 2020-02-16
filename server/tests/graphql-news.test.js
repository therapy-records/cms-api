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
  NEWS_ARTICLE_BASE: {
    title: 'Test article',
    sections: [
      {
        images: [
          { url: 'test.com/something.jpg' },
          { url: 'test.com/something2.jpg' }
        ],
        copy: 'Testing',
        videoEmbed: '<iframe />'
      }
    ]
  }
};

MOCK.NEWS_ARTICLE = MOCK.NEWS_ARTICLE_BASE;

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

describe('## GraphQL - News queries', () => {
  after((done) => {
    request(app)
      .delete('api/test/news')
      .then((err) => {
        if (err) {
          throw err;
        }
        done();
      });
    done();
  });

  it('should create a new article', (done) => {
    request(app)
      .post('/api/news')
      .set('Authorization', JWT_VALID)
      .send(MOCK.NEWS_ARTICLE)
      .expect(httpStatus.OK)
      .then((res) => {
        expect(res.body.title).to.equal(MOCK.NEWS_ARTICLE.title);
        expect(res.body.createdAt).to.be.a('string');
        expect(res.body.sections).to.be.an('array');
        MOCK.EDITED_NEWS_ARTICLE = res.body;
        done();
      })
      .catch(done);
  });

  describe('# get all news', () => {
    it('should return all articles', (done) => {
      request(app)
        .post('/graphql')
        .send({
          query: 'query{news{_id, title}}'
        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.data.news).to.be.an('array');
          expect(res.body.data.news[0]).to.be.an('object');
          expect(res.body.data.news[0]._id).to.be.a('string');
          expect(res.body.data.news[0].title).to.be.a('string');
          expect(res.body.data.news[0].title).to.eq(MOCK.NEWS_ARTICLE.title);
          done();
        });
    });
  });
});
