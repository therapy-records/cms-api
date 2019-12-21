const urlFriendlyString = (str) => {
  // TODO: combine regex into one regex?
  // replace non-letters, non-numbers and white space with an empty string
  const regex = new RegExp(/[^a-zA-Z0-9\s+]/g);
  const stripSpecialCharacters = str.replace(regex, '');
  return stripSpecialCharacters.replace(/\s+/g, '-').toLowerCase();
};

const isValidUsername = (username, validUsernames) => {
  let usernamesWhiteList;
  if (validUsernames.includes(' ')) {
    usernamesWhiteList = validUsernames.split(' ');
  } else {
    usernamesWhiteList = [validUsernames];
  }
  if (usernamesWhiteList.includes(username)) {
    return true;
  }
  return false;
};

module.exports = {
  urlFriendlyString,
  isValidUsername
};
