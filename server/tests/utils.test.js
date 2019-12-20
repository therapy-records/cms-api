const chai = require('chai');
const {
  urlFriendlyString,
  isValidUsername
} = require('../utils');

chai.config.includeStack = true;
const expect = chai.expect;

after(done => done());

describe('## Utils', () => {
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
});
