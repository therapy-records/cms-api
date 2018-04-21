/**
 * Create a url friendly string
 * @property string: 'Hello World Test'
 * @returns 'hello-world-test'
 */

const urlFriendlyString = str =>
  str.replace(/\s+/g, '-').toLowerCase();

/**
 * Create mainImage object
 * @property mainImage: { url: String, externalLink: String }
 * @returns mainImage: { url, externalLink }
 */
const createNewsArticleMainImage = (mainImage, ticketsLink) => {
  if (!mainImage || !mainImage.url) return {};

  const _mainImage = {
    url: mainImage.url,
    externalLink: mainImage.externalLink
  };

  // assign ticketsLink to mainImageLink if !mainImage.externalLink
  if (ticketsLink &&
      mainImage.url &&
      !mainImage.externalLink) {
    _mainImage.externalLink = ticketsLink;
  }

  return _mainImage;
};

module.exports = {
  urlFriendlyString,
  createNewsArticleMainImage
};
