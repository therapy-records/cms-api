import mongoose from 'mongoose';

const NewsSchema = (add) => {
  const schema = mongoose.Schema({ // eslint-disable-line new-cap
    title: {
      type: String,
      required: true
    },
    bodyMain: {
      type: Object,
      required: true
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
    mainImageUrl: {
      type: String
    },
    miniGalleryImages: {
      type: Array
    }
  });

  if (add) {
    schema.add(add);
  }

  return schema;
};

export default NewsSchema;
