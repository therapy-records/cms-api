/**
 * Create a url friendly string
 * @property string: 'Hello World Test'
 * @returns 'hello-world-test'
 */

const urlFriendlyString = (str) => {
  // TODO: combine regex into one regex?
  // replace non-letters, non-numbers and white space with an empty string
  const regex = new RegExp(/[^a-zA-Z0-9\s+]/g);
  const stripSpecialCharacters = str.replace(regex, '');
  return stripSpecialCharacters.replace(/\s+/g, '-').toLowerCase();
};

/**
 * Create mainImage object
 * @property mainImage: { url: String, externalLink: String }
 * @returns mainImage: { url, externalLink }
 */

module.exports = {
  urlFriendlyString
};
