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
  OTHER_WORK: {
    title: 'test 123',
    copy: 'test copy',
    mainImageUrl: 'images.com/me.jpg',
    externalLink: 'google.com',
    releaseDate: 'Mon Apr 02 2018 11:34:54 GMT+0100 (BST)'
  },
  EDITED_OTHER_WORK: {}
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
        .send(MOCK.OTHER_WORK)
        .expect(httpStatus.UNAUTHORIZED)
        .then(() => done())
        .catch(done);
    });
    it('should create new journalism', (done) => {
      request(app)
        .post('/api/journalism')
        .set('Authorization', JWT_VALID)
        .send(MOCK.OTHER_WORK)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.title).to.equal(MOCK.OTHER_WORK.title);
          expect(res.body.copy).to.equal(MOCK.OTHER_WORK.copy);
          expect(res.body.mainImageUrl).to.deep.eq(MOCK.OTHER_WORK.mainImageUrl);
          expect(res.body.releaseDate).to.deep.eq(MOCK.OTHER_WORK.releaseDate);
          expect(res.body.createdAt).to.be.a('string');
          MOCK.EDITED_OTHER_WORK = res.body;
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
        .get(`/api/journalism/${MOCK.EDITED_OTHER_WORK._id}`)
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
        .put(`/api/journalism/${MOCK.EDITED_OTHER_WORK._id}`)
        .send(MOCK.EDITED_OTHER_WORK)
        .expect(httpStatus.UNAUTHORIZED)
        .then(() => done())
        .catch(done);
    });
    it('should update journalism', (done) => {
      const editedJournalism = {
        title: 'new title',
        copy: 'new copy',
        mainImageUrl: 'newImageurl.jpg',
        releaseDate: new Date(),
        externalLink: 'testing.com',
        createdAt: new Date()
      };

      MOCK.EDITED_OTHER_WORK.title = editedJournalism.title;
      MOCK.EDITED_OTHER_WORK.copy = editedJournalism.copy;
      MOCK.EDITED_OTHER_WORK.mainImageUrl = editedJournalism.mainImageUrl;
      MOCK.EDITED_OTHER_WORK.releaseDate = editedJournalism.releaseDate;
      MOCK.EDITED_OTHER_WORK.externalLink = editedJournalism.externalLink;
      MOCK.EDITED_OTHER_WORK.createdAt = editedJournalism.createdAt;

      request(app)
        .put(`/api/journalism/${MOCK.EDITED_OTHER_WORK._id}`)
        .set('Authorization', JWT_VALID)
        .send(MOCK.EDITED_OTHER_WORK)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.title).to.equal(MOCK.EDITED_OTHER_WORK.title);
          expect(res.body.copy).to.equal(MOCK.EDITED_OTHER_WORK.copy);
          expect(res.body.mainImageUrl).to.equal(MOCK.EDITED_OTHER_WORK.mainImageUrl);
          expect(res.body.releaseDate).to.be.a('string');
          expect(res.body.externalLink).to.equal(MOCK.EDITED_OTHER_WORK.externalLink);
          expect(res.body.createdAt).to.be.a('string');
          done();
        })
        .catch(done);
    });
  });
  describe('# DELETE /api/journalism/id', () => {
    it('should return unauthorized when no token provided', (done) => {
      request(app)
        .delete(`/api/journalism/${MOCK.EDITED_OTHER_WORK._id}`)
        .send(MOCK.EDITED_OTHER_WORK)
        .expect(httpStatus.UNAUTHORIZED)
        .then(() => done())
        .catch(done);
    });
    it('should remove journalism', (done) => {
      request(app)
        .delete(`/api/journalism/${MOCK.EDITED_OTHER_WORK._id}`)
        .set('Authorization', JWT_VALID)
        .send(MOCK.EDITED_OTHER_WORK)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.message).to.equal('Journalism article deleted');
          done();
        })
        .catch(done);
    });
  });
});
