import mongoose from 'mongoose';

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
    bodyMain: {
      type: Object,
      required: true
    },
    quotes: {
      type: Array
    },
    createdAt: {
      type: Date
    },
    editedAt: {
      type: Date
    },
    ticketsLink: {
      type: String
    },
    venueLink: {
      type: String
    },
    videoEmbed: {
      type: String
    },
    mainImage: {
      type: Object
    },
    secondaryImageUrl: {
      type: String
    },
    miniGalleryImages: {
      type: Array
    },
    socialShare: {
      hashtags: {
        type: Array
      }
    }
  }, _collectionName);

  if (add) {
    schema.add(add);
  }

  return schema;
};

export default NewsSchema;
