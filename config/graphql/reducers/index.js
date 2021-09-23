const pressReducer = (p) => {
  const press = JSON.parse(JSON.stringify(p));

  let mappedImage = {
    cloudinaryUrl: '',
    cloudinaryPublicId: ''
  };

  if (press.image) {
    mappedImage = press.image;
  }

  return {
    ...press,
    image: mappedImage,
  };
};

const reducers = {
  pressReducer
};

module.exports = reducers;
