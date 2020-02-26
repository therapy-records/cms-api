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

let ALL_COLLABORATORS = [];

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
          ALL_COLLABORATORS = res.body.data.collaborators;
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

  describe('graphql - edit collaborator', () => {
    it('should edit collaborator', (done) => {
      const edited = {
        name: 'new name',
        role: 'edited role',
        about: '<p>new about</p>',
        avatarUrl: 'http://test.comnewpic.jpg',
        collabOn: [
          'edited collab',
          'second edited collab'
        ]
      };
      const lastCreatedCollab = ALL_COLLABORATORS[ALL_COLLABORATORS.length - 1];

      request(app)
        .post('/graphql')
        .set('Authorization', JWT_VALID)
        .send({
          query: `mutation{ editCollaborator(_id: "${lastCreatedCollab._id}", input: { name: "${edited.name}", role: "${edited.role}", about: "${edited.about}", avatarUrl: "${edited.avatarUrl}", collabOn: [ "${edited.collabOn[0]}", "${edited.collabOn[1]}" ] }) {_id, name, role, about, avatarUrl, collabOn}}`
        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.data.editCollaborator).to.be.an('object');
          expect(res.body.data.editCollaborator._id).to.be.a('string');
          expect(res.body.data.editCollaborator.name).to.be.a('string');
          expect(res.body.data.editCollaborator.name).to.eq(edited.name);
          expect(res.body.data.editCollaborator.role).to.be.a('string');
          expect(res.body.data.editCollaborator.role).to.eq(edited.role);
          expect(res.body.data.editCollaborator.about).to.be.a('string');
          expect(res.body.data.editCollaborator.about).to.eq(edited.about);
          expect(res.body.data.editCollaborator.avatarUrl).to.be.a('string');
          expect(res.body.data.editCollaborator.avatarUrl).to.eq(edited.avatarUrl);
          expect(res.body.data.editCollaborator.collabOn).to.be.an('array');
          expect(res.body.data.editCollaborator.collabOn).to.deep.eq(edited.collabOn);
          done();
        });
    });
  });

  describe('graphql - edit collaborators order numbers', () => {
    it('should edit given collaborators order numbers', (done) => {
      const lastCreatedCollab = ALL_COLLABORATORS[ALL_COLLABORATORS.length - 1];
      const secondFromLastCreatedCollab = ALL_COLLABORATORS[ALL_COLLABORATORS.length - 2];
      const mockInput = {
        collaborators: [
          {
            _id: lastCreatedCollab._id,
            orderNumber: 1
          },
          {
            _id: secondFromLastCreatedCollab._id,
            orderNumber: 2
          }
        ]
      };

      request(app)
        .post('/graphql')
        .set('Authorization', JWT_VALID)
        .send({
          query: `mutation{ editCollaboratorOrderNumbers(input: { collaborators: [ { _id: "${mockInput.collaborators[0]._id}", orderNumber: ${mockInput.collaborators[0].orderNumber} }, { _id: "${mockInput.collaborators[1]._id}", orderNumber: ${mockInput.collaborators[1].orderNumber} } ] }) {_id, orderNumber}}`
        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.data.editCollaboratorOrderNumbers).to.be.an('array');
          expect(res.body.data.editCollaboratorOrderNumbers[0]._id).to.be.a('string');
          expect(res.body.data.editCollaboratorOrderNumbers[0]._id).to.eq(mockInput.collaborators[0]._id); // eslint-disable-line max-len
          expect(res.body.data.editCollaboratorOrderNumbers[0].orderNumber).to.be.a('string');
          expect(res.body.data.editCollaboratorOrderNumbers[0].orderNumber).to.eq(mockInput.collaborators[0].orderNumber.toString()); // eslint-disable-line max-len
          expect(res.body.data.editCollaboratorOrderNumbers[1]._id).to.be.a('string');
          expect(res.body.data.editCollaboratorOrderNumbers[1]._id).to.eq(mockInput.collaborators[1]._id); // eslint-disable-line max-len
          expect(res.body.data.editCollaboratorOrderNumbers[1].orderNumber).to.be.a('string');
          expect(res.body.data.editCollaboratorOrderNumbers[1].orderNumber).to.eq(mockInput.collaborators[1].orderNumber.toString()); // eslint-disable-line max-len
          done();
        });
    });
  });

  describe('graphql - delete collaborator', () => {
    it('should delete collaborator', (done) => {
      const lastCreatedCollab = ALL_COLLABORATORS[ALL_COLLABORATORS.length - 1];

      request(app)
        .post('/graphql')
        .set('Authorization', JWT_VALID)
        .send({
          query: `mutation{ deleteCollaborator(_id: "${lastCreatedCollab._id}") {_id}}`
        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.data.deleteCollaborator).to.deep.eq({
            _id: lastCreatedCollab._id
          });
          done();
        });
    });
  });
});
