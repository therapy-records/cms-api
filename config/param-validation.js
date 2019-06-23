const Joi = require('joi');

const newsSectionImages = Joi.object().keys({
  url: Joi.string()
});

const newsSection = Joi.object().keys({
  images: Joi.array().items(newsSectionImages),
  copy: Joi.string().required()
});

module.exports = {
  // PUT /api/news/:id
  editNewsPost: {
    body: {
      title: Joi.string().required(),
      sections: Joi.array().items(newsSection)
    }
  },
  // POST /api/users
  createUser: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  }
};
