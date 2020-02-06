const chai = require('chai');
const spies = require('chai-spies');
const mongoose = require('mongoose');
const request = require('supertest');
const httpStatus = require('http-status');
const config = require('../../config/env');
const app = require('../../index');
const {
  urlFriendlyString,
  isValidUsername
} = require('../utils');
const isValidToken = require('../utils/isValidToken');
const splitToken = require('../utils/splitToken');
const authCheck = require('../utils/authCheck');

chai.config.includeStack = true;
const expect = chai.expect;

chai.use(spies);

const MOCK = {
  AUTH_USER: {
    username: config.username,
    password: config.pword
  }
};

let JWT_VALID = '';

after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## Utils', () => {
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

  describe('urlFriendlyString', () => {
    it('should return a formatted string without special characters, white space or uppercase letters', () => {
      const str = 'hello WORLD! all the 123 things, amazing!@£$ - great stuff!';
      const result = urlFriendlyString(str);
      const expected = 'hello-world-all-the-123-things-amazing-great-stuff';
      expect(result).to.eq(expected);
    });
  });

  describe('isValidUsername', () => {
    let mockValidUsernames;

    describe('when there are multiple valid usernames', () => {
      beforeEach(() => {
        mockValidUsernames = 'testA testB';
      });

      describe('when a valid username is passed', () => {
        it('should return true', () => {
          const result = isValidUsername('testB', mockValidUsernames);
          expect(result).to.eq(true);
        });
      });

      describe('when an invalid username is passed', () => {
        it('should return false', () => {
          const result = isValidUsername('test', mockValidUsernames);
          expect(result).to.eq(false);
        });
      });
    });

    describe('when there is only one single valid username', () => {
      beforeEach(() => {
        mockValidUsernames = 'testA';
      });

      describe('when a valid username is passed', () => {
        it('should return true', () => {
          const result = isValidUsername('testA', mockValidUsernames);
          expect(result).to.eq(true);
        });
      });

      describe('when an invalid username is passed', () => {
        it('should return false', () => {
          const result = isValidUsername('test', mockValidUsernames);
          expect(result).to.eq(false);
        });
      });
    });
  });

  describe('isValidToken', () => {
    describe('when no token is provided', () => {
      it('should return an error', () =>
        isValidToken().catch(catchErr =>
          expect(catchErr).to.deep.eq(new Error('Unauthorized'))
        )
      );
    });

    describe('when an empty token is provided', () => {
      it('should return an error', () =>
        isValidToken('').catch(catchErr =>
          expect(catchErr).to.deep.eq(new Error('Unauthorized'))
        )
      );
    });

    describe('when an invalid is provided', () => {
      it('should return an error', () =>
        isValidToken('test').catch(catchErr =>
          expect(catchErr).to.deep.eq(new Error('Unauthorized'))
        )
      );
    });

    describe('when a valid token is provided', () => {
      it('should return true', () => {
        isValidToken(JWT_VALID).then((result) => {
          expect(result).to.eq(true);
        });
      });
    });
  });

  describe('splitToken', () => {
    it('should return a split string', () => {
      const result = splitToken('Bearer ABCD1234');
      expect(result).to.eq('ABCD1234');
    });

    describe('when there is no empty space in the string/token', () => {
      it('should return null', () => {
        const result = splitToken('ABCD1234');
        expect(result).to.eq(null);
      });
    });
  });

  describe('authCheck', () => {
    describe('with a valid token', () => {
      it('should call the given resolve function', () => {
        const mockContext = {
          token: JWT_VALID
        };

        const mockFunc = () => {};
        const spy = chai.spy(mockFunc);

        return authCheck(mockContext, spy).then(() =>
          expect(spy).to.have.been.called
        );
      });
    });

    describe('with an invalid token', () => {
      it('should NOT call the given resolve function', () => {
        const mockContext = {
          token: 'invalid'
        };

        const mockFunc = () => { };
        const spy = chai.spy(mockFunc);

        return authCheck(mockContext, spy).catch((catchErr) => {
          expect(spy).to.not.have.been.called; // eslint-disable-line no-unused-expressions
          return expect(catchErr).to.deep.eq(new Error('Unauthorized'));
        });
      });
    });
  });
});
