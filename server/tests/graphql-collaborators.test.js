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
  COLLABORATOR: {
    name: 'test collab',
    role: 'testing',
    about: '<p>testing</p>',
    avatarUrl: 'images.com/test.jpg',
    collabOn: ['a', 'b', 'c']
  }
};

let JWT_VALID = '';

let COLLABORATOR_ID = '';

after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## GraphQL - Collaborators mutations/queries', () => {
  after((done) => {
    request(app)
      .delete('api/test/collaborators')
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

  describe('graphql - create new collaborator', () => {
    it('should create new collaborator', (done) => {
      request(app)
        .post('/graphql')
        .set('Authorization', JWT_VALID)
        .send({
          query: `mutation{ createCollaborator(input: { name: "${MOCK.COLLABORATOR.name}", role: "${MOCK.COLLABORATOR.role}", about: "${MOCK.COLLABORATOR.about}", avatarUrl: "${MOCK.COLLABORATOR.avatarUrl}", collabOn: [ "${MOCK.COLLABORATOR.collabOn[0]}", "${MOCK.COLLABORATOR.collabOn[1]}", "${MOCK.COLLABORATOR.collabOn[2]}" ] }) {_id, name, role, about, avatarUrl, collabOn}}`
        })
        .expect(httpStatus.OK)
        .then((res) => {
          COLLABORATOR_ID = res.body.data.createCollaborator._id;
          expect(res.body.data.createCollaborator).to.be.an('object');
          expect(res.body.data.createCollaborator._id).to.be.a('string');
          expect(res.body.data.createCollaborator.name).to.be.a('string');
          expect(res.body.data.createCollaborator.name).to.eq(MOCK.COLLABORATOR.name);
          expect(res.body.data.createCollaborator.role).to.be.a('string');
          expect(res.body.data.createCollaborator.role).to.eq(MOCK.COLLABORATOR.role);
          expect(res.body.data.createCollaborator.about).to.be.a('string');
          expect(res.body.data.createCollaborator.about).to.eq(MOCK.COLLABORATOR.about);
          expect(res.body.data.createCollaborator.avatarUrl).to.be.a('string');
          expect(res.body.data.createCollaborator.avatarUrl).to.eq(MOCK.COLLABORATOR.avatarUrl);
          expect(res.body.data.createCollaborator.collabOn).to.be.an('array');
          expect(res.body.data.createCollaborator.collabOn).to.deep.eq(MOCK.COLLABORATOR.collabOn);
          done();
        });
    });
  });

  describe('graphql - get all collaborators', () => {
    it('should return all collaborators', (done) => {
      request(app)
        .post('/graphql')
        .set('Authorization', JWT_VALID)
        .send({
          query: 'query{collaborators{_id, name, role, about, avatarUrl, collabOn}}'
        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.data.collaborators).to.be.an('array');
          expect(res.body.data.collaborators[0]._id).to.be.a('string');
          expect(res.body.data.collaborators[0].name).to.be.a('string');
          expect(res.body.data.collaborators[0].name).to.eq(MOCK.COLLABORATOR.name);
          expect(res.body.data.collaborators[0].role).to.be.a('string');
          expect(res.body.data.collaborators[0].role).to.eq(MOCK.COLLABORATOR.role);
          expect(res.body.data.collaborators[0].about).to.be.a('string');
          expect(res.body.data.collaborators[0].about).to.eq(MOCK.COLLABORATOR.about);
          expect(res.body.data.collaborators[0].avatarUrl).to.be.a('string');
          expect(res.body.data.collaborators[0].avatarUrl).to.eq(MOCK.COLLABORATOR.avatarUrl);
          expect(res.body.data.collaborators[0].collabOn).to.be.an('array');
          expect(res.body.data.collaborators[0].collabOn).to.deep.eq(MOCK.COLLABORATOR.collabOn);
          done();
        });
    });
  });

  describe('graphql - get single collaborator', () => {
    it('should return a collaborator by ID', (done) => {
      request(app)
        .post('/graphql')
        .set('Authorization', JWT_VALID)
        .send({
          query: `query{collaborator(_id: "${COLLABORATOR_ID}"){ _id, name, role, about, avatarUrl, collabOn}}`
        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.data.collaborator).to.be.an('object');
          expect(res.body.data.collaborator._id).to.be.a('string');
          expect(res.body.data.collaborator._id).to.eq(COLLABORATOR_ID);
          expect(res.body.data.collaborator.name).to.be.a('string');
          expect(res.body.data.collaborator.name).to.eq(MOCK.COLLABORATOR.name);
          expect(res.body.data.collaborator.role).to.be.a('string');
          expect(res.body.data.collaborator.role).to.eq(MOCK.COLLABORATOR.role);
          expect(res.body.data.collaborator.about).to.be.a('string');
          expect(res.body.data.collaborator.about).to.eq(MOCK.COLLABORATOR.about);
          expect(res.body.data.collaborator.avatarUrl).to.be.a('string');
          expect(res.body.data.collaborator.avatarUrl).to.eq(MOCK.COLLABORATOR.avatarUrl);
          expect(res.body.data.collaborator.collabOn).to.be.an('array');
          expect(res.body.data.collaborator.collabOn).to.deep.eq(MOCK.COLLABORATOR.collabOn);
          done();
        });
    });
  });
});
