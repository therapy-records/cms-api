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
    name: 'someone',
    role: 'tea',
    about: '<p>amazing person</p>',
    avatarUrl: 'google.com',
    urls: {
      website: 'http://website.com',
      facebook: 'http://facebook.com',
      instagram: 'http://instagram.com',
      twitter: 'http://twitter.com',
      soundcloud: 'http://soundcloud.com',
      bio: 'http://mybio.com',
      email: 'hello@test.com',
      phone: '012345678910',
      other: [
        {
          url: 'something.com',
          title: 'amazing website'
        },
        {
          url: 'somethingelse.com',
          title: 'a website'
        }
      ]
    },
    collabOn: [
      'album A',
      'collab B',
      'album C'
    ]
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
      })
      .catch(done);
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
          delete res.body.urls.other[0]._id; // eslint-disable-line no-param-reassign
          delete res.body.urls.other[1]._id; // eslint-disable-line no-param-reassign
          expect(res.body.name).to.equal(MOCK.COLLABORATOR.name);
          expect(res.body.role).to.equal(MOCK.COLLABORATOR.role);
          expect(res.body.about).to.deep.eq(MOCK.COLLABORATOR.about);
          expect(res.body.avatarUrl).to.equal(MOCK.COLLABORATOR.avatarUrl);
          expect(res.body.urls).to.deep.eq(MOCK.COLLABORATOR.urls);
          expect(res.body.collabOn).to.deep.eq(MOCK.COLLABORATOR.collabOn);
          MOCK.EDITED_COLLABORATOR = res.body;
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
        about: 'testing',
        avatarUrl: 'google.com/something.jpg',
        urls: {
          website: 'test.com',
          facebook: 'facebook.com/test',
          other: []
        },
        collabOn: [
          'hello a',
          'hello b',
          'hello c'
        ]
      };

      MOCK.EDITED_COLLABORATOR.name = editedCollaborator.name;
      MOCK.EDITED_COLLABORATOR.role = editedCollaborator.role;
      MOCK.EDITED_COLLABORATOR.about = editedCollaborator.about;
      MOCK.EDITED_COLLABORATOR.avatarUrl = editedCollaborator.avatarUrl;
      MOCK.EDITED_COLLABORATOR.urls = editedCollaborator.urls;
      MOCK.EDITED_COLLABORATOR.collabOn = editedCollaborator.collabOn;

      request(app)
        .put(`/api/collaborators/${MOCK.EDITED_COLLABORATOR._id}`)
        .set('Authorization', JWT_VALID)
        .send(MOCK.EDITED_COLLABORATOR)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(MOCK.EDITED_COLLABORATOR.name);
          expect(res.body.role).to.equal(MOCK.EDITED_COLLABORATOR.role);
          expect(res.body.about).to.equal(MOCK.EDITED_COLLABORATOR.about);
          expect(res.body.avatarUrl).to.equal(MOCK.EDITED_COLLABORATOR.avatarUrl);
          expect(res.body.urls).to.deep.eq(MOCK.EDITED_COLLABORATOR.urls);
          expect(res.body.collabOn).to.deep.eq(MOCK.EDITED_COLLABORATOR.collabOn);
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
