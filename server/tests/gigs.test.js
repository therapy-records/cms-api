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
  GIG: {
    title: 'Artist live',
    location: 'London',
    venue: 'Jazz Bar in London',
    date: 'Fri Dec 27 2019 13:39:00',
    ticketsUrl: 'http://test.com'
  },
  EDITED_GIG: {}
};

let JWT_VALID = '';

after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## Gigs APIs', () => {
  after((done) => {
    request(app)
      .delete('api/test/gigs')
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

  describe('# POST /api/gigs', () => {
    it('should return unauthorized when no token provided', (done) => {
      request(app)
        .post('/api/gigs')
        .send(MOCK.GIG)
        .expect(httpStatus.UNAUTHORIZED)
        .then(() => done())
        .catch(done);
    });
    it('should create a new gig', (done) => {
      request(app)
        .post('/api/gigs')
        .set('Authorization', JWT_VALID)
        .send(MOCK.GIG)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.title).to.equal(MOCK.GIG.title);
          expect(res.body.location).to.equal(MOCK.GIG.location);
          expect(res.body.venue).to.equal(MOCK.GIG.venue);
          expect(res.body.date).to.equal(MOCK.GIG.date);
          expect(res.body.ticketsUrl).to.equal(MOCK.GIG.ticketsUrl);
          MOCK.EDITED_GIG = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/gigs', () => {
    it('should get all gigs', (done) => {
      request(app)
        .get('/api/gigs')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].title).to.be.a('string');
          done();
        });
    });
  });

  describe('# GET /api/gigs/id', () => {
    it('should get a single gig', (done) => {
      request(app)
        .get(`/api/gigs/${MOCK.EDITED_GIG._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.title).to.be.a('string');
          done();
        });
    });
  });

  describe('# PUT /api/gigs/id', () => {
    it('should return unauthorized when no token provided', (done) => {
      request(app)
        .put(`/api/gigs/${MOCK.EDITED_GIG._id}`)
        .send(MOCK.EDITED_GIG)
        .expect(httpStatus.UNAUTHORIZED)
        .then(() => done())
        .catch(done);
    });
    it('should update a gig', (done) => {
      const editedGig = {
        title: 'New title',
        location: 'New location',
        venue: 'Different location',
        date: 'Sat Dec 28 2019 13:39:00',
        ticketsUrl: 'http://test2.com'
      };

      MOCK.EDITED_GIG.title = editedGig.title;
      MOCK.EDITED_GIG.location = editedGig.location;
      MOCK.EDITED_GIG.venue = editedGig.venue;
      MOCK.EDITED_GIG.date = editedGig.date;
      MOCK.EDITED_GIG.ticketsUrl = editedGig.ticketsUrl;

      request(app)
        .put(`/api/gigs/${MOCK.EDITED_GIG._id}`)
        .set('Authorization', JWT_VALID)
        .send(MOCK.EDITED_GIG)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.title).to.equal(MOCK.EDITED_GIG.title);
          expect(res.body.location).to.equal(MOCK.EDITED_GIG.location);
          expect(res.body.venue).to.equal(MOCK.EDITED_GIG.venue);
          expect(res.body.date).to.deep.eq(MOCK.EDITED_GIG.date);
          expect(res.body.ticketsUrl).to.deep.eq(MOCK.EDITED_GIG.ticketsUrl);
          done();
        })
        .catch(done);
    });
  });
  describe('# DELETE /api/gigs/id', () => {
    it('should return unauthorized when no token provided', (done) => {
      request(app)
        .delete(`/api/gigs/${MOCK.EDITED_GIG._id}`)
        .send(MOCK.EDITED_GIG)
        .expect(httpStatus.UNAUTHORIZED)
        .then(() => done())
        .catch(done);
    });
    it('should remove a gig', (done) => {
      request(app)
        .delete(`/api/gigs/${MOCK.EDITED_GIG._id}`)
        .set('Authorization', JWT_VALID)
        .send(MOCK.EDITED_GIG)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.message).to.equal('Gig deleted');
          done();
        })
        .catch(done);
    });
  });
});
