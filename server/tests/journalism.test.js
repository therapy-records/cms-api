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
  JOURNALISM: {
    title: 'test 123',
    copy: 'test copy',
    imageUrl: 'images.com/me.jpg',
    externalLink: 'google.com',
    releaseDate: 'Mon Apr 02 2018 11:34:54 GMT+0100 (BST)'
  },
  EDITED_JOURNALISM: {}
};

let JWT_VALID = '';

after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## Journalism APIs', () => {
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
        })
        .catch(done);
    });
  });

  describe('# POST /api/journalism', () => {
    it('should return unauthorized when no token provided', (done) => {
      request(app)
        .post('/api/journalism')
        .send(MOCK.JOURNALISM)
        .expect(httpStatus.UNAUTHORIZED)
        .then(() => done())
        .catch(done);
    });
    it('should create new journalism article', (done) => {
      request(app)
        .post('/api/journalism')
        .set('Authorization', JWT_VALID)
        .send(MOCK.JOURNALISM)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.title).to.equal(MOCK.JOURNALISM.title);
          expect(res.body.copy).to.equal(MOCK.JOURNALISM.copy);
          expect(res.body.imageUrl).to.deep.eq(MOCK.JOURNALISM.imageUrl);
          expect(res.body.releaseDate).to.deep.eq(MOCK.JOURNALISM.releaseDate);
          expect(res.body.createdAt).to.be.a('string');
          MOCK.EDITED_JOURNALISM = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/journalism', () => {
    it('should get all journalism', (done) => {
      request(app)
        .get('/api/journalism')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].title).to.be.a('string');
          done();
        });
    });
  });

  describe('# GET /api/journalism/id', () => {
    it('should get single journalism', (done) => {
      request(app)
        .get(`/api/journalism/${MOCK.EDITED_JOURNALISM._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.title).to.be.a('string');
          done();
        });
    });
  });

  describe('# PUT /api/journalism/id', () => {
    it('should return unauthorized when no token provided', (done) => {
      request(app)
        .put(`/api/journalism/${MOCK.EDITED_JOURNALISM._id}`)
        .send(MOCK.EDITED_JOURNALISM)
        .expect(httpStatus.UNAUTHORIZED)
        .then(() => done())
        .catch(done);
    });
    it('should update journalism', (done) => {
      const editedJournalism = {
        title: 'new title',
        copy: 'new copy',
        imageUrl: 'newImageurl.jpg',
        releaseDate: new Date(),
        externalLink: 'testing.com',
        createdAt: new Date()
      };

      MOCK.EDITED_JOURNALISM.title = editedJournalism.title;
      MOCK.EDITED_JOURNALISM.copy = editedJournalism.copy;
      MOCK.EDITED_JOURNALISM.imageUrl = editedJournalism.imageUrl;
      MOCK.EDITED_JOURNALISM.releaseDate = editedJournalism.releaseDate;
      MOCK.EDITED_JOURNALISM.externalLink = editedJournalism.externalLink;
      MOCK.EDITED_JOURNALISM.createdAt = editedJournalism.createdAt;

      request(app)
        .put(`/api/journalism/${MOCK.EDITED_JOURNALISM._id}`)
        .set('Authorization', JWT_VALID)
        .send(MOCK.EDITED_JOURNALISM)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.title).to.equal(MOCK.EDITED_JOURNALISM.title);
          expect(res.body.copy).to.equal(MOCK.EDITED_JOURNALISM.copy);
          expect(res.body.imageUrl).to.equal(MOCK.EDITED_JOURNALISM.imageUrl);
          expect(res.body.releaseDate).to.be.a('string');
          expect(res.body.externalLink).to.equal(MOCK.EDITED_JOURNALISM.externalLink);
          expect(res.body.createdAt).to.be.a('string');
          done();
        })
        .catch(done);
    });
  });
  describe('# DELETE /api/journalism/id', () => {
    it('should return unauthorized when no token provided', (done) => {
      request(app)
        .delete(`/api/journalism/${MOCK.EDITED_JOURNALISM._id}`)
        .send(MOCK.EDITED_JOURNALISM)
        .expect(httpStatus.UNAUTHORIZED)
        .then(() => done())
        .catch(done);
    });
    it('should remove journalism', (done) => {
      request(app)
        .delete(`/api/journalism/${MOCK.EDITED_JOURNALISM._id}`)
        .set('Authorization', JWT_VALID)
        .send(MOCK.EDITED_JOURNALISM)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.message).to.equal('Journalism article deleted');
          done();
        })
        .catch(done);
    });
  });
});
