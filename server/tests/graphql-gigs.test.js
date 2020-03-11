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
    title: 'test title',
    location: 'London',
    venue: 'Test Venue',
    date: 'date string',
    ticketsUrl: 'article.com/test'
  }
};

let JWT_VALID = '';
let GIG_ID = '';
let ALL_GIGS = [];

after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## GraphQL - Gigs mutations/queries', () => {
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
        });
    });
  });

  describe('graphql - create new gig', () => {
    it('should create new gig', (done) => {
      request(app)
        .post('/graphql')
        .set('Authorization', JWT_VALID)
        .send({
          query: `mutation{ createGig(input: { title: "${MOCK.GIG.title}", location: "${MOCK.GIG.location}", venue: "${MOCK.GIG.venue}", date: "${MOCK.GIG.date}", ticketsUrl: "${MOCK.GIG.ticketsUrl}" }) {_id, title, location, venue, date, ticketsUrl}}`
        })
        .expect(httpStatus.OK)
        .then((res) => {
          GIG_ID = res.body.data.createGig._id;
          expect(res.body.data.createGig).to.be.an('object');
          expect(res.body.data.createGig._id).to.be.a('string');
          expect(res.body.data.createGig.title).to.be.a('string');
          expect(res.body.data.createGig.title).to.eq(MOCK.GIG.title);
          expect(res.body.data.createGig.location).to.be.a('string');
          expect(res.body.data.createGig.location).to.eq(MOCK.GIG.location);
          expect(res.body.data.createGig.venue).to.be.a('string');
          expect(res.body.data.createGig.venue).to.eq(MOCK.GIG.venue);
          expect(res.body.data.createGig.date).to.be.a('string');
          expect(res.body.data.createGig.date).to.eq(MOCK.GIG.date);
          expect(res.body.data.createGig.ticketsUrl).to.be.a('string');
          expect(res.body.data.createGig.ticketsUrl).to.eq(MOCK.GIG.ticketsUrl);
          done();
        });
    });
  });

  describe('graphql - get all gigs', () => {
    it('should return all gigs', (done) => {
      request(app)
        .post('/graphql')
        .set('Authorization', JWT_VALID)
        .send({
          query: 'query{gigs{_id, title, location, venue, date, ticketsUrl}}'
        })
        .expect(httpStatus.OK)
        .then((res) => {
          ALL_GIGS = res.body.data.gigs;
          expect(res.body.data.gigs).to.be.an('array');
          expect(res.body.data.gigs[0]._id).to.be.a('string');
          expect(res.body.data.gigs[0].title).to.be.a('string');
          expect(res.body.data.gigs[0].title).to.eq(MOCK.GIG.title);
          expect(res.body.data.gigs[0].location).to.be.a('string');
          expect(res.body.data.gigs[0].location).to.eq(MOCK.GIG.location);
          expect(res.body.data.gigs[0].venue).to.be.a('string');
          expect(res.body.data.gigs[0].venue).to.eq(MOCK.GIG.venue);
          expect(res.body.data.gigs[0].date).to.be.a('string');
          expect(res.body.data.gigs[0].date).to.eq(MOCK.GIG.date);
          expect(res.body.data.gigs[0].ticketsUrl).to.be.a('string');
          expect(res.body.data.gigs[0].ticketsUrl).to.eq(MOCK.GIG.ticketsUrl);
          done();
        });
    });
  });

  describe('graphql - get single press article', () => {
    it('should return a press article by ID', (done) => {
      request(app)
        .post('/graphql')
        .set('Authorization', JWT_VALID)
        .send({
          query: `query{gig(_id: "${GIG_ID}"){_id, title, location, venue, date, ticketsUrl}}`
        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.data.gig).to.be.an('object');
          expect(res.body.data.gig._id).to.be.a('string');
          expect(res.body.data.gig.title).to.be.a('string');
          expect(res.body.data.gig.title).to.eq(MOCK.GIG.title);
          expect(res.body.data.gig.location).to.be.a('string');
          expect(res.body.data.gig.location).to.eq(MOCK.GIG.location);
          expect(res.body.data.gig.venue).to.be.a('string');
          expect(res.body.data.gig.venue).to.eq(MOCK.GIG.venue);
          expect(res.body.data.gig.date).to.be.a('string');
          expect(res.body.data.gig.date).to.eq(MOCK.GIG.date);
          expect(res.body.data.gig.ticketsUrl).to.be.a('string');
          expect(res.body.data.gig.ticketsUrl).to.eq(MOCK.GIG.ticketsUrl);
          done();
        });
    });
  });

  describe('graphql - edit gig', () => {
    it('should edit the gig', (done) => {
      const edited = {
        title: 'new title',
        location: 'edited location',
        venue: 'edited venue',
        date: 'edited date',
        ticketsUrl: 'edited.com'
      };
      const lastCreatedGig = ALL_GIGS[ALL_GIGS.length - 1];

      request(app)
        .post('/graphql')
        .set('Authorization', JWT_VALID)
        .send({
          query: `mutation{ editGig(_id: "${lastCreatedGig._id}", input: { title: "${edited.title}", location: "${edited.location}", venue: "${edited.venue}", date: "${edited.date}", ticketsUrl: "${edited.ticketsUrl}" }) {_id, title, location, venue, date, ticketsUrl}}`

        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.data.editGig).to.be.an('object');
          expect(res.body.data.editGig._id).to.be.a('string');
          expect(res.body.data.editGig.title).to.be.a('string');
          expect(res.body.data.editGig.title).to.eq(edited.title);
          expect(res.body.data.editGig.location).to.be.a('string');
          expect(res.body.data.editGig.location).to.eq(edited.location);
          expect(res.body.data.editGig.venue).to.be.a('string');
          expect(res.body.data.editGig.venue).to.eq(edited.venue);
          expect(res.body.data.editGig.date).to.be.a('string');
          expect(res.body.data.editGig.date).to.eq(edited.date);
          expect(res.body.data.editGig.ticketsUrl).to.be.a('string');
          expect(res.body.data.editGig.ticketsUrl).to.eq(edited.ticketsUrl);
          done();
        });
    });
  });

  describe('graphql - delete gig', () => {
    it('should delete gig', (done) => {
      const lastCreatedGig = ALL_GIGS[ALL_GIGS.length - 1];

      request(app)
        .post('/graphql')
        .set('Authorization', JWT_VALID)
        .send({
          query: `mutation{ deleteGig(_id: "${lastCreatedGig._id}") {_id}}`
        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.data.deleteGig).to.deep.eq({
            _id: lastCreatedGig._id
          });
          done();
        });
    });
  });
});
