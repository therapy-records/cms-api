const mongoose = require('mongoose');

const NewsSchema = (add, collectionName) => {
  const _collectionName = collectionName ? { collection: collectionName } : {};

  const schema = mongoose.Schema({ // eslint-disable-line new-cap
    title: {
      type: String,
      required: true
    },
    urlTitle: {
      type: String
    },
    createdAt: {
      type: Date
    },
    editedAt: {
      type: Date
    },
    sections: [{
      images: [{
        url: String
      }],
      copy: String,
      videoEmbed: String
    }]
  }, _collectionName);

  if (add) {
    schema.add(add);
  }

  return schema;
};

module.exports = NewsSchema;
