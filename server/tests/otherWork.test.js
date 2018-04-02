import mongoose from 'mongoose';
import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import config from '../../config/env';
import app from '../../index';

chai.config.includeStack = true;

const MOCK = {
  AUTH_USER: {
    username: config.username,
    password: config.pword
  },
  OTHER_WORK: {
    title: 'test 123',
    copy: 'test copy',
    mainImageUrl: 'images.com/me.jpg',
    externalLink: 'google.com',
    releaseDate: 'Mon Apr 02 2018 11:34:54 GMT+0100 (BST)'
  },
  EDITED_OTHER_WORK: {}
};

let JWT_VALID = '';

after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## Other Work APIs', () => {
  after((done) => {
    request(app)
      .delete('api/test/other-work')
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

  describe('# POST /api/other-work', () => {
    it('should return unauthorized when no token provided', (done) => {
      request(app)
        .post('/api/other-work')
        .send(MOCK.OTHER_WORK)
        .expect(httpStatus.UNAUTHORIZED)
        .then(() => done())
        .catch(done);
    });
    it('should create new other work', (done) => {
      request(app)
        .post('/api/other-work')
        .set('Authorization', JWT_VALID)
        .send(MOCK.OTHER_WORK)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.title).to.equal(MOCK.OTHER_WORK.title);
          expect(res.body.copy).to.equal(MOCK.OTHER_WORK.copy);
          expect(res.body.mainImageUrl).to.deep.eq(MOCK.OTHER_WORK.mainImageUrl);
          expect(res.body.releaseDate).to.deep.eq(MOCK.OTHER_WORK.releaseDate);
          expect(res.body.createdAt).to.be.a('string');
          MOCK.EDITED_OTHER_WORK = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/other-work', () => {
    it('should get all other work', (done) => {
      request(app)
        .get('/api/other-work')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].author).to.be.a('string');
          done();
        });
    });
  });

  describe('# GET /api/other-work/id', () => {
    it('should get single other work', (done) => {
      request(app)
        .get(`/api/other-work/${MOCK.EDITED_OTHER_WORK._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.author).to.be.a('string');
          done();
        });
    });
  });

  describe('# PUT /api/other-work/id', () => {
    it('should return unauthorized when no token provided', (done) => {
      request(app)
        .put(`/api/other-work/${MOCK.EDITED_OTHER_WORK._id}`)
        .send(MOCK.EDITED_OTHER_WORK)
        .expect(httpStatus.UNAUTHORIZED)
        .then(() => done())
        .catch(done);
    });
    it('should update other work', (done) => {
      const editedOtherWork = {
        author: 'new author',
        copy: 'new copy',
        mainImageUrl: 'newImageurl.jpg',
        externalLink: 'awholenewworld.com'
      };

      MOCK.EDITED_OTHER_WORK.author = editedOtherWork.author;
      MOCK.EDITED_OTHER_WORK.copy = editedOtherWork.copy;
      MOCK.EDITED_OTHER_WORK.mainImageUrl = editedOtherWork.mainImageUrl;
      MOCK.EDITED_OTHER_WORK.externalLink = editedOtherWork.externalLink;

      request(app)
        .put(`/api/other-work/${MOCK.EDITED_OTHER_WORK._id}`)
        .set('Authorization', JWT_VALID)
        .send(MOCK.EDITED_OTHER_WORK)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.author).to.equal(MOCK.EDITED_OTHER_WORK.author);
          expect(res.body.copy).to.equal(MOCK.EDITED_OTHER_WORK.copy);
          expect(res.body.mainImageUrl).to.equal(MOCK.EDITED_OTHER_WORK.mainImageUrl);
          expect(res.body.externalLink).to.equal(MOCK.EDITED_OTHER_WORK.externalLink);
          done();
        })
        .catch(done);
    });
  });
  describe('# DELETE /api/other-work/id', () => {
    it('should return unauthorized when no token provided', (done) => {
      request(app)
        .delete(`/api/other-work/${MOCK.EDITED_OTHER_WORK._id}`)
        .send(MOCK.EDITED_OTHER_WORK)
        .expect(httpStatus.UNAUTHORIZED)
        .then(() => done())
        .catch(done);
    });
    it('should remove other work', (done) => {
      request(app)
        .delete(`/api/other-work/${MOCK.EDITED_OTHER_WORK._id}`)
        .set('Authorization', JWT_VALID)
        .send(MOCK.EDITED_OTHER_WORK)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.message).to.equal('Other Work article deleted');
          done();
        })
        .catch(done);
    });
  });
});
