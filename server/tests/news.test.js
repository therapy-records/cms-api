const mongoose = require('mongoose');
const request = require('supertest');
const httpStatus = require('http-status');
const chai = require('chai');
const config = require('../../config/env');
const { urlFriendlyString } = require('../utils');
const app = require('../../index');

chai.config.includeStack = true;
const expect = chai.expect;

const MOCK = {
  AUTH_USER: {
    username: config.username,
    password: config.pword
  },
  NEWS_ARTICLE_BASE: {
    title: 'testing article',
    bodyMain: '<p>asdf</p>',
    quotes: [
      { author: 'asdf', copy: 'test1' },
      { author: 'asdf', copy: 'test2' },
    ],
    mainImage: {
      url: 'test.com/something.jpg',
      externalLink: 'something.com'
    },
    secondaryImageUrl: 'test.com/hello.png',
    miniGalleryImages: ['test.com/image.png', 'test.com/image.png'],
    socialShare: {
      hashtags: ['#something', '#yes']
    },
    ticketsLink: 'http://google.com',
    venueLink: 'http://yahoo.com',
    videoEmbed: 'http://youtube.com/asdf',
  },
  EDITED_NEWS_ARTICLE: {},
};

MOCK.NEWS_ARTICLE = MOCK.NEWS_ARTICLE_BASE;

let JWT_VALID = '';

after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## News APIs', () => {
  after((done) => {
    request(app)
      .delete('api/test/news')
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

  describe('# POST /api/news', () => {
    it('should return unauthorized when no token provided', (done) => {
      request(app)
        .post('/api/news')
        .send(MOCK.NEWS_ARTICLE)
        .expect(httpStatus.UNAUTHORIZED)
        .then(() => done())
        .catch(done);
    });
    it('should create a new article', (done) => {
      request(app)
        .post('/api/news')
        .set('Authorization', JWT_VALID)
        .send(MOCK.NEWS_ARTICLE)
        .expect(httpStatus.OK)
        .then((res) => {
          const expectedUrlTitle = urlFriendlyString(MOCK.NEWS_ARTICLE.title);
          expect(res.body.title).to.equal(MOCK.NEWS_ARTICLE.title);
          expect(res.body.urlTitle).to.equal(expectedUrlTitle);
          expect(res.body.createdAt).to.be.a('string');
          expect(res.body.bodyMain).to.equal(MOCK.NEWS_ARTICLE.bodyMain);
          expect(res.body.quotes).to.eql(MOCK.NEWS_ARTICLE.quotes);
          expect(res.body.mainImage).to.deep.eq(MOCK.NEWS_ARTICLE.mainImage);
          expect(res.body.secondaryImageUrl).to.equal(MOCK.NEWS_ARTICLE.secondaryImageUrl);
          expect(res.body.miniGalleryImages).to.deep.eq(MOCK.NEWS_ARTICLE.miniGalleryImages);
          expect(res.body.socialShare).to.eql(MOCK.NEWS_ARTICLE.socialShare);
          expect(res.body.ticketsLink).to.equal(MOCK.NEWS_ARTICLE.ticketsLink);
          expect(res.body.venueLink).to.equal(MOCK.NEWS_ARTICLE.venueLink);
          expect(res.body.videoEmbed).to.equal(MOCK.NEWS_ARTICLE.videoEmbed);
          MOCK.EDITED_NEWS_ARTICLE = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/news', () => {
    it('should get all articles', (done) => {
      request(app)
        .get('/api/news')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].title).to.be.a('string');
          done();
        });
    });
  });

  describe('# GET /api/news/id', () => {
    it('should get a single article', (done) => {
      request(app)
        .get(`/api/news/${MOCK.EDITED_NEWS_ARTICLE._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.title).to.be.a('string');
          done();
        });
    });
  });

  describe('# PUT /api/news/id', () => {
    it('should return unauthorized when no token provided', (done) => {
      request(app)
        .put(`/api/news/${MOCK.EDITED_NEWS_ARTICLE._id}`)
        .send(MOCK.NEWS_ARTICLE)
        .expect(httpStatus.UNAUTHORIZED)
        .then(() => done())
        .catch(done);
    });

    it('should update an article', (done) => {
      const editedNews = {
        title: 'edited title',
        bodyMain: '<p>hello test</p>'
      };

      MOCK.EDITED_NEWS_ARTICLE.title = editedNews.title;
      MOCK.EDITED_NEWS_ARTICLE.title = editedNews.bodyMain;

      request(app)
        .put(`/api/news/${MOCK.EDITED_NEWS_ARTICLE._id}`)
        .set('Authorization', JWT_VALID)
        .send(MOCK.EDITED_NEWS_ARTICLE)
        .expect(httpStatus.OK)
        .then((res) => {
          const expectedUrlTitle = urlFriendlyString(MOCK.NEWS_ARTICLE.title);
          expect(res.body.urlTitle).to.equal(expectedUrlTitle);
          expect(res.body.title).to.equal(MOCK.EDITED_NEWS_ARTICLE.title);
          expect(res.body.bodyMain).to.equal(MOCK.EDITED_NEWS_ARTICLE.bodyMain);
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/news/id', () => {
    it('should return unauthorized when no token provided', (done) => {
      request(app)
        .delete(`/api/news/${MOCK.EDITED_NEWS_ARTICLE._id}`)
        .send(MOCK.EDITED_NEWS_ARTICLE)
        .expect(httpStatus.UNAUTHORIZED)
        .then(() => done())
        .catch(done);
    });
    it('should remove an article', (done) => {
      request(app)
        .delete(`/api/news/${MOCK.EDITED_NEWS_ARTICLE._id}`)
        .set('Authorization', JWT_VALID)
        .send(MOCK.EDITED_NEWS_ARTICLE)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.message).to.equal('Article deleted');
          done();
        })
        .catch(done);
    });
  });
});
