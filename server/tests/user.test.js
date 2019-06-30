const mongoose = require('mongoose');
const request = require('supertest');
const httpStatus = require('http-status');
const chai = require('chai');
const config = require('../../config/env');
const app = require('../../index');

chai.config.includeStack = true;
const expect = chai.expect;

after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## User APIs', () => {
  const validUserObj = {
    username: config.validUn,
    password: config.pword
  };
  const createdUser = {};

  describe('# POST /api/user', () => {
    describe('with no password', () => {
      it('should return error message', (done) => {
        const invalidUserObj = { username: 'dummy' };
        request(app)
          .post('/api/user')
          .send(invalidUserObj)
          .expect(httpStatus.BAD_REQUEST)
          .then((res) => {
            expect(res.body.success).to.equal(false);
            expect(res.body.message).to.equal('Please provide username and password.');
            done();
          })
          .catch(done);
      });
    });

    describe('with incorrect username', () => {
      it('should return invalid username message', (done) => {
        const invalidUserObj = {
          username: 'dummy',
          password: 'password'
        };
        request(app)
          .post('/api/user')
          .send(invalidUserObj)
          .expect(httpStatus.BAD_REQUEST)
          .then((res) => {
            expect(res.body.success).to.equal(false);
            expect(res.body.message).to.equal('Invalid username');
            done();
          })
          .catch(done);
      });
    });

    it('should create a new user', (done) => {
      request(app)
        .post('/api/user')
        .send(validUserObj)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('Successfully created a new user.');
          expect(res.body.userId).to.be.a('string');
          createdUser._id = res.body.userId;
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/user/', () => {
    it('should delete user', (done) => {
      request(app)
        .delete(`/api/user/${createdUser._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body._id).to.equal(createdUser._id);
          done();
        })
        .catch(done);
    });
  });
});
