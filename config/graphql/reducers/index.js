const pressReducer = (articles) => {
  const mapped = articles;

  mapped.map((article) => {
    const press = JSON.parse(JSON.stringify(article));

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
  });
  return mapped;
};

const reducers = {
  pressReducer
};

module.exports = reducers;
