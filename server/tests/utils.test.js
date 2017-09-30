import chai, { expect } from 'chai';
import {
  urlFriendlyString,
  createNewsArticleMainImage
} from '../utils';

chai.config.includeStack = true;

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

  describe('createNewsArticleMainImage', () => {
    context('when no mainImage exists', () => {
      it('should return an empty object', () => {
        const result = createNewsArticleMainImage();
        expect(result).to.deep.eq({});
      });
    });
    context('when no mainImage.url exists', () => {
      it('should return an empty object', () => {
        const result = createNewsArticleMainImage({});
        expect(result).to.deep.eq({});
      });
    });
    context('when ticketsLink exists and mainImage has a url and NO externalLink', () => {
      it('should assign ticketsLink to mainImage.externalLink', () => {
        const mainImage = {
          url: 'testing.com/hi.jpg',
          externalLink: ''
        };
        const ticketsLink = 'mytickets.com';

        const result = createNewsArticleMainImage(mainImage, ticketsLink);
        expect(result).to.be.an('object');
        expect(result.externalLink).to.eq(ticketsLink);
      });
    });
    context('when ticketsLink exists and mainImage has a url AND AN externalLink', () => {
      it('should not edit the mainImage.externaLink', () => {
        const extLink = 'myExternalLink.com';
        const mainImage = {
          url: 'testing.com/hi.jpg',
          externalLink: extLink
        };
        const ticketsLink = 'mytickets.com';

        const result = createNewsArticleMainImage(mainImage, ticketsLink);
        expect(result.externalLink).to.not.eq(ticketsLink);
        expect(result.externalLink).to.eq(extLink);
      });
    });
    context('when ticketsLink doesn\'t exist', () => {
      it('should not edit the mainImage.externaLink', () => {
        const extLink = 'myExternalLink.com';
        const mainImage = {
          url: 'testing.com/hi.jpg',
          externalLink: extLink
        };
        const ticketsLink = '';

        const result = createNewsArticleMainImage(mainImage, ticketsLink);
        expect(result.externalLink).to.not.eq(ticketsLink);
        expect(result.externalLink).to.eq(extLink);
      });
    });
  });
});
