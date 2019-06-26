const chai = require('chai');
const {
  urlFriendlyString
} = require('../utils');

chai.config.includeStack = true;
const expect = chai.expect;

after(done => done());

describe('## Utils', () => {
  describe('urlFriendlyString', () => {
    it('should return a formatted string without special characters, white space or uppercase letters', () => {
      const str = 'hello WORLD! all the 123 things, amazing!@£$ - great stuff!';
      const actual = urlFriendlyString(str);
      const expected = 'hello-world-all-the-123-things-amazing-great-stuff';
     expect(actual).to.eq(expected);
    });
  });
});
