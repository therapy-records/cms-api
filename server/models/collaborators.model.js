const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

const Schema = mongoose.Schema; // eslint-disable-line no-unused-vars

/**
 * Collaborator Schema
 */
const CollaboratorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  urlName: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  orderNumber: {
    type: String
  },
  about: {
    type: String
  },
  avatarUrl: {
    type: String,
    required: true
  },
  urls: {
    website: {
      type: String
    },
    facebook: {
      type: String
    },
    instagram: {
      type: String
    },
    twitter: {
      type: String
    },
    soundcloud: {
      type: String
    },
    bandcamp: {
      type: String
    },
    bio: {
      type: String
    },
    email: {
      type: String
    },
    phone: {
      type: String
    }
  },
  collabOn: {
    type: Array
  }
});

CollaboratorSchema.statics = {
  async createNew(obj) {
    const totalCollaborators = await this.count({});

    if (totalCollaborators) {
      // note: orderNumber is zero index based, .count() is not.
      obj.orderNumber = String(totalCollaborators); // eslint-disable-line no-param-reassign
      obj.urlName = obj.name.replace(/ /g, '-'); // eslint-disable-line no-param-reassign

      return this.create(obj)
        .then((collab) => {
          if (collab) {
            return collab;
          }
          const err = new APIError('Error creating collaborator', httpStatus.NOT_FOUND);
          return Promise.reject(err);
        });
    }
    const err = new APIError('Error creating collaborator', httpStatus.NOT_FOUND);
    return Promise.reject(err);
  },

  getSingle(id) {
    return this.findById(id)
      .exec()
      .then((collab) => {
        if (collab) {
          return collab;
        }
        const err = new APIError('No such collaborator exists', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  edit(obj) {
    return this.findOneAndUpdate({ _id: obj._id },
      obj, { new: true })
      .exec()
      .then((updatedCollab) => {
        if (updatedCollab) {
          return updatedCollab;
        }
        const err = new APIError('Error saving collaborator', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  updateMultipleOrderNumbers(collaborators) {
    const updatedCollabs = [];
    return Promise.each(collaborators, collab =>
      this.findOneAndUpdate({ _id: collab._id },
        { orderNumber: collab.orderNumber },
        { new: true }
      )
        .exec((error, updatedCollab) => {
          if (error) {
            const err = new APIError('Error saving collaborator', httpStatus.NOT_FOUND);
            return Promise.reject(err);
          }
          updatedCollabs.push(updatedCollab);
          return updatedCollab;
        })
    ).then(() => {
      const collabsUpdated = [
        ...updatedCollabs.map(c => ({
          _id: c._id,
          orderNumber: c.orderNumber
        }))
      ];
      return collabsUpdated;
    })
      .catch(() => {
        const errrrr = new APIError('Error updating collaborator with ', httpStatus.NOT_FOUND);
        return Promise.reject(errrrr);
      });
  }

};

/**
 * @typedef Collaborator
 */
module.exports = mongoose.model('collaborators', CollaboratorSchema);
