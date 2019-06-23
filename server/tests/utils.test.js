const chai = require('chai');
const {
  urlFriendlyString
} = require('../utils');

chai.config.includeStack = true;
const expect = chai.expect;

after(done => done());

describe('## Utils', () => {
  describe('urlFriendlyString', () => {
    it('should return a formatted string', () => {
      const str = 'hello world all the 123 things';
      const actual = urlFriendlyString(str);
      const expected = 'hello-world-all-the-123-things';
      expect(actual).to.eq(expected);
    });
  });
});
