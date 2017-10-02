import mongoose from 'mongoose';
import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import config from '../../config/env';
import app from '../../index';

chai.config.includeStack = true;

const MOCK = {
  AUTH_USER: {
    username: config.username,
    password: config.pword
  },
  PRESS: {
    author: 'press 123',
    copy: 'test copy',
    mainImageUrl: 'images.com/me.jpg',
    externalLink: 'google.com'
  },
  EDITED_PRESS: {}
};

let JWT_VALID = '';


after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## Press APIs', () => {
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

  describe('# GET /api/press', () => {
    it('should get all press', (done) => {
      request(app)
        .get('/api/press')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].author).to.be.a('string');
          done();
        });
    });
  });

  describe('# POST /api/press', () => {
    it('should return unauthorized when no token provided', (done) => {
      request(app)
        .post('/api/press')
        .send(MOCK.PRESS)
        .expect(httpStatus.UNAUTHORIZED)
        .then(() => done())
        .catch(done);
    });
    it('should create new press', (done) => {
      request(app)
        .post('/api/press')
        .set('Authorization', JWT_VALID)
        .send(MOCK.PRESS)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.author).to.equal(MOCK.PRESS.author);
          expect(res.body.copy).to.equal(MOCK.PRESS.copy);
          expect(res.body.mainImageUrl).to.deep.eq(MOCK.PRESS.mainImageUrl);
          expect(res.body.createdAt).to.be.a('string');
          MOCK.EDITED_PRESS = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/press/id', () => {
    it('should get single press', (done) => {
      request(app)
        .get(`/api/press/${MOCK.EDITED_PRESS._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.author).to.be.a('string');
          done();
        });
    });
  });

  describe('# PUT /api/press/id', () => {
    it('should return unauthorized when no token provided', (done) => {
      request(app)
        .put(`/api/press/${MOCK.EDITED_PRESS._id}`)
        .send(MOCK.EDITED_PRESS)
        .expect(httpStatus.UNAUTHORIZED)
        .then(() => done())
        .catch(done);
    });
    it('should update press', (done) => {
      const editedPress = {
        author: 'new author',
        copy: 'new copy',
        mainImageUrl: 'newImageurl.jpg',
        externalLink: 'awholenewworld.com'
      };

      MOCK.EDITED_PRESS.author = editedPress.author;
      MOCK.EDITED_PRESS.copy = editedPress.copy;
      MOCK.EDITED_PRESS.mainImageUrl = editedPress.mainImageUrl;
      MOCK.EDITED_PRESS.externalLink = editedPress.externalLink;

      request(app)
        .put(`/api/press/${MOCK.EDITED_PRESS._id}`)
        .set('Authorization', JWT_VALID)
        .send(MOCK.EDITED_PRESS)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.author).to.equal(MOCK.EDITED_PRESS.author);
          expect(res.body.copy).to.equal(MOCK.EDITED_PRESS.copy);
          expect(res.body.mainImageUrl).to.equal(MOCK.EDITED_PRESS.mainImageUrl);
          expect(res.body.externalLink).to.equal(MOCK.EDITED_PRESS.externalLink);
          done();
        })
        .catch(done);
    });
  });
  describe('# DELETE /api/press/id', () => {
    it('should return unauthorized when no token provided', (done) => {
      request(app)
        .delete(`/api/press/${MOCK.EDITED_PRESS._id}`)
        .send(MOCK.EDITED_PRESS)
        .expect(httpStatus.UNAUTHORIZED)
        .then(() => done())
        .catch(done);
    });
    it('should remove press', (done) => {
      request(app)
        .delete(`/api/press/${MOCK.EDITED_PRESS._id}`)
        .set('Authorization', JWT_VALID)
        .send(MOCK.EDITED_PRESS)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.message).to.equal('Press deleted');
          done();
        })
        .catch(done);
    });
  });
});
