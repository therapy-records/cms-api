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

describe('## Auth', () => {
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

  describe('# POST /api/auth', () => {
    describe('when username is invalid', () => {
      it('should return 403 user not found message', (done) => {
        const userObj = { username: 'asdf' };
        request(app)
          .post('/api/auth')
          .set('Authorization', 'Bearer invalid')
          .send(userObj)
          .expect(httpStatus.FORBIDDEN)
          .then((res) => {
            expect(res.body.success).to.eq(false);
            expect(res.body.message).to.eq('User not found');
            done();
          })
          .catch(done);
      });
    });
    describe('when no token is provided', () => {
      it('should return 403 no token provided ', (done) => {
        const userObj = { username: 'asdf' };
        request(app)
          .post('/api/auth')
          .set('Authorization', '')
          .send(userObj)
          .expect(httpStatus.FORBIDDEN)
          .then((res) => {
            expect(res.body.success).to.eq(false);
            expect(res.body.message).to.eq('No token provided');
            done();
          })
          .catch(done);
      });
    });
    it('should return OK', (done) => {
      request(app)
        .post('/api/auth')
        .set('Authorization', JWT_VALID)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.success).to.eq(true);
          done();
        })
        .catch(done);
    });
  });

  describe('# POST /api/auth/login', () => {
    describe('when no username', () => {
      it('should return 401 user not found message', (done) => {
        request(app)
          .post('/api/auth/login')
          .set('Authorization', 'Bearer invalid')
          .send({ username: '' })
          .expect(httpStatus.UNAUTHORIZED)
          .then((res) => {
            expect(res.body.success).to.eq(false);
            expect(res.body.message).to.eq('User not found');
            done();
          })
          .catch(done);
      });
    });
    describe('when username is invalid', () => {
      it('should return 401 user not found message', (done) => {
        request(app)
          .post('/api/auth/login')
          .set('Authorization', 'Bearer invalid')
          .send({ username: 'asdf' })
          .expect(httpStatus.UNAUTHORIZED)
          .then((res) => {
            expect(res.body.success).to.eq(false);
            expect(res.body.message).to.eq('User not found');
            done();
          })
          .catch(done);
      });
    });

    describe('when password does not match', () => {
      it('should return 401 user not found message', (done) => {
        request(app)
          .post('/api/auth/login')
          .set('Authorization', 'Bearer invalid')
          .send({ username: config.validUn, password: 'aaaa' })
          .expect(httpStatus.UNAUTHORIZED)
          .then((res) => {
            expect(res.body.success).to.eq(false);
            expect(res.body.message).to.eq('Invalid username or password');
            done();
          })
          .catch(done);
      });
    });

    it('should return OK with token and userId', (done) => {
      request(app)
        .post('/api/auth/login')
        .set('Authorization', JWT_VALID)
        .send({ username: config.validUn, password: config.pword })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.success).to.eq(true);
          expect(res.body.token).to.be.a('string');
          expect(res.body.userId).to.be.a('string');
          done();
        })
        .catch(done);
    });
  });
});
