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

module.exports = {
  urlFriendlyString
};
