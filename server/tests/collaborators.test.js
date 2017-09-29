import mongoose from 'mongoose';
import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../index';

chai.config.includeStack = true;

// TODO: /id DELETE
// TODO: news queue endpoints
// TODO: news queue/id endpoints

// TODO: get credentials from somewhere instead of in the code
// also add task in trello board to ensure test/dev/prod credentials

const MOCK = {
  AUTH_USER: {
    username: 'b1admin',
    password: 'M5fz0I2Tthb9J|B'
  },
  COLLABORATOR: {
    name: 'someone',
    role: 'teae',
    imgUrl: 'google.com'
  },
  EDITED_COLLABORATOR: {}
};

let JWT_VALID = '';


after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## Collaborators APIs', () => {
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

  describe('# GET /api/collaborators', () => {
    it('should get all collaborators', (done) => {
      request(app)
        .get('/api/collaborators')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].name).to.be.a('string');
          done();
        });
    });
  });

  describe('# POST /api/collaborators', () => {
    it('should return unauthorized when no token provided', (done) => {
      request(app)
        .post('/api/collaborators')
        .send(MOCK.COLLABORATOR)
        .expect(httpStatus.UNAUTHORIZED)
        .then(() => done())
        .catch(done);
    });
    it('should create a new collaborator', (done) => {
      request(app)
        .post('/api/collaborators')
        .set('Authorization', JWT_VALID)
        .send(MOCK.COLLABORATOR)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(MOCK.COLLABORATOR.name);
          MOCK.EDITED_COLLABORATOR = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/collaborators/id', () => {
    it('should get a single collaborator', (done) => {
      request(app)
        .get(`/api/collaborators/${MOCK.EDITED_COLLABORATOR._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.name).to.be.a('string');
          done();
        });
    });
  });

  describe('# PUT /api/collaborators/id', () => {
    it('should return unauthorized when no token provided', (done) => {
      request(app)
        .put(`/api/collaborators/${MOCK.EDITED_COLLABORATOR._id}`)
        .send(MOCK.EDITED_COLLABORATOR)
        .expect(httpStatus.UNAUTHORIZED)
        .then(() => done())
        .catch(done);
    });
    it('should update a collaborator', (done) => {
      const editedCollaborator = {
        name: 'new name',
        role: 'coffee person',
        imgUrl: 'google.com/something.jpg'
      };

      MOCK.EDITED_COLLABORATOR.name = editedCollaborator.name;
      MOCK.EDITED_COLLABORATOR.role = editedCollaborator.role;
      MOCK.EDITED_COLLABORATOR.imgUrl = editedCollaborator.imgUrl;

      request(app)
        .put(`/api/collaborators/${MOCK.EDITED_COLLABORATOR._id}`)
        .set('Authorization', JWT_VALID)
        .send(MOCK.EDITED_COLLABORATOR)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(MOCK.EDITED_COLLABORATOR.name);
          expect(res.body.role).to.equal(MOCK.EDITED_COLLABORATOR.role);
          expect(res.body.imgUrl).to.equal(MOCK.EDITED_COLLABORATOR.imgUrl);
          done();
        })
        .catch(done);
    });
  });
  describe('# DELETE /api/collaborators/id', () => {
    it('should return unauthorized when no token provided', (done) => {
      request(app)
        .delete(`/api/collaborators/${MOCK.EDITED_COLLABORATOR._id}`)
        .send(MOCK.EDITED_COLLABORATOR)
        .expect(httpStatus.UNAUTHORIZED)
        .then(() => done())
        .catch(done);
    });
    it('should remove a collaborator', (done) => {
      request(app)
        .delete(`/api/collaborators/${MOCK.EDITED_COLLABORATOR._id}`)
        .set('Authorization', JWT_VALID)
        .send(MOCK.EDITED_COLLABORATOR)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.message).to.equal('Collaborator deleted');
          done();
        })
        .catch(done);
    });
  });
});
