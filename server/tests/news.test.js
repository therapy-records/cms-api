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
    subHeading: 'all the things',
    mainBody: '{asdf:true}',
    createdAt: new Date()
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
          expect(res.body.mainBody).to.equal(news.mainBody);
          news = res.body;
          done();
        })
        .catch(done);
    });
  });
});
