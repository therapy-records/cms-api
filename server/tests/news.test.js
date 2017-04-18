import mongoose from 'mongoose';
import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../index';

chai.config.includeStack = true;

/**
 * root level hooks
 */
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## News APIs', () => {
  let news = {
    title: 'first post',
    bodyMain: '{asdf:true}',
    createdAt: new Date(),
    ticketsLink: 'http://google.com',
    venueLink: 'http://yahoo.com',
    videoEmbed: 'http://youtube.com/asdf'
  };

  describe('# GET /api/news', () => {
    it('should get all posts', (done) => {
      request(app)
        .get('/api/news')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].title).to.be.a('string');
          done();
        })
        .catch(done);
    });
  });

  describe('# POST /api/news', () => {
    it('should create a new post', (done) => {
      request(app)
        .post('/api/news')
        .send(news)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.title).to.equal(news.title);
          expect(res.body.bodyMain).to.equal(news.bodyMain);
          expect(res.body.ticketsLink).to.equal(news.ticketsLink);
          expect(res.body.venueLink).to.equal(news.venueLink);
          expect(res.body.videoEmbed).to.equal(news.videoEmbed);
          news = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe('# PUT /api/news', () => {
    it('should edit a post', (done) => {
      const newPost = {
        title: 'updated post title',
        bodyMain: '<p>something</p>'
      };
      request(app)
        .put('/api/news/58f1ed7dc2d168865d732793')
        .send(newPost)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.title).to.equal(newPost.title);
          expect(res.body.bodyMain).to.equal(newPost.bodyMain);
          expect(res.body.editedAt).to.exist();
          news = res.body;
          done();
        })
        .catch(done);
    });
  });
});
