const mongoose = require('mongoose');

const NewsSchema = (add, collectionName) => {
  const _collectionName = collectionName ? { collection: collectionName } : {};

  const schema = mongoose.Schema({ // eslint-disable-line new-cap
    isArchived: {
      type: Boolean,
      required: false
    },
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
        cloudinaryUrl: String,
        cloudinaryPublicId: String
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
