/**
 * Create a url friendly string
 * @property string: 'Hello World Test'
 * @returns 'hello-world-test'
 */

const urlFriendlyString = str =>
  str.replace(/\s+/g, '-').toLowerCase();

export default {
  urlFriendlyString
};
