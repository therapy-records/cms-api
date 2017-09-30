import chai, { expect } from 'chai';
import { urlFriendlyString } from '../utils';

chai.config.includeStack = true;

after(done => done());

describe('## Utils', () => {
  describe(' urlFriendlyString', () => {
    it('should return a formatted string', () => {
      const str = 'hello world all the 123 things';
      const actual = urlFriendlyString(str);
      const expected = 'hello-world-all-the-123-things';
      expect(actual).to.eq(expected);
    });
  });
});
