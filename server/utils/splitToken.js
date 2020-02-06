const splitToken = (token) => {
  const parted = token.split(' ');
  if (parted.length === 2) {
    return parted[1];
  }
  return null;
};

module.exports = splitToken;
