import mongoose from 'mongoose';
import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import config from '../../config/env';
import { urlFriendlyString } from '../utils';
import app from '../../index';

chai.config.includeStack = true;

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

MOCK.NEWS_ARTICLE_QUEUE = MOCK.NEWS_ARTICLE_BASE;
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

  describe('# POST /api/news/queue', () => {
    it('should return unauthorized when no token provided', (done) => {
      request(app)
        .post('/api/news/queue')
        .send(MOCK.NEWS_ARTICLE_QUEUE)
        .expect(httpStatus.UNAUTHORIZED)
        .then(() => done())
        .catch(done);
    });
    it('should create a new article', (done) => {
      MOCK.NEWS_ARTICLE_QUEUE.scheduledTime = new Date();
      request(app)
        .post('/api/news/queue')
        .set('Authorization', JWT_VALID)
        .send(MOCK.NEWS_ARTICLE_QUEUE)
        .expect(httpStatus.OK)
        .then((res) => {
          const expectedUrlTitle = urlFriendlyString(MOCK.NEWS_ARTICLE_QUEUE.title);
          expect(res.body.title).to.equal(MOCK.NEWS_ARTICLE_QUEUE.title);
          expect(res.body.urlTitle).to.equal(expectedUrlTitle);
          expect(res.body.bodyMain).to.equal(MOCK.NEWS_ARTICLE_QUEUE.bodyMain);
          expect(res.body.scheduledTime).to.be.a('string');
          expect(res.body.quotes).to.eql(MOCK.NEWS_ARTICLE_QUEUE.quotes);
          expect(res.body.mainImage).to.deep.eq(MOCK.NEWS_ARTICLE_QUEUE.mainImage);
          expect(res.body.secondaryImageUrl).to.equal(MOCK.NEWS_ARTICLE_QUEUE.secondaryImageUrl);
          expect(res.body.miniGalleryImages).to.deep.eq(MOCK.NEWS_ARTICLE_QUEUE.miniGalleryImages);
          expect(res.body.socialShare).to.eql(MOCK.NEWS_ARTICLE_QUEUE.socialShare);
          expect(res.body.createdAt).to.be.a('string');
          expect(res.body.ticketsLink).to.equal(MOCK.NEWS_ARTICLE_QUEUE.ticketsLink);
          expect(res.body.venueLink).to.equal(MOCK.NEWS_ARTICLE_QUEUE.venueLink);
          MOCK.NEWS_ARTICLE_QUEUE._id = res.body._id;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/news/queue', () => {
    it('should return unauthorized when no token provided', (done) => {
      request(app)
        .get('/api/news/queue')
        .send(MOCK.NEWS_ARTICLE)
        .expect(httpStatus.UNAUTHORIZED)
        .then(() => done())
        .catch(done);
    });
    it('should get all articles', (done) => {
      request(app)
        .get('/api/news/queue')
        .set('Authorization', JWT_VALID)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].title).to.be.a('string');
          done();
        });
    });
  });

  describe('# PUT /api/news/queue/id', () => {
    it('should return unauthorized when no token provided', (done) => {
      request(app)
        .put(`/api/news/queue/${MOCK.NEWS_ARTICLE_QUEUE._id}`)
        .send(MOCK.NEWS_ARTICLE_QUEUE)
        .expect(httpStatus.UNAUTHORIZED)
        .then(() => done())
        .catch(done);
    });

    it('should update an article', (done) => {
      request(app)
        .put(`/api/news/queue/${MOCK.NEWS_ARTICLE_QUEUE._id}`)
        .set('Authorization', JWT_VALID)
        .send(MOCK.NEWS_ARTICLE_QUEUE)
        .expect(httpStatus.OK)
        .then((res) => {
          const expectedUrlTitle = urlFriendlyString(MOCK.NEWS_ARTICLE_QUEUE.title);
          expect(res.body.title).to.equal(MOCK.NEWS_ARTICLE_QUEUE.title);
          expect(res.body.urlTitle).to.equal(expectedUrlTitle);
          expect(res.body.bodyMain).to.equal(MOCK.NEWS_ARTICLE_QUEUE.bodyMain);
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/news/queue/id', () => {
    it('should return unauthorized when no token provided', (done) => {
      request(app)
        .delete(`/api/news/queue/${MOCK.NEWS_ARTICLE_QUEUE._id}`)
        .send(MOCK.NEWS_ARTICLE_QUEUE)
        .expect(httpStatus.UNAUTHORIZED)
        .then(() => done())
        .catch(done);
    });
    it('should remove an article', (done) => {
      request(app)
        .delete(`/api/news/queue/${MOCK.NEWS_ARTICLE_QUEUE._id}`)
        .set('Authorization', JWT_VALID)
        .send(MOCK.NEWS_ARTICLE_QUEUE)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.message).to.equal('Article (in queue) deleted');
          done();
        })
        .catch(done);
    });
  });
});
