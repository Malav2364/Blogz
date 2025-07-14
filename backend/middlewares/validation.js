import Joi from 'joi';

// Validation schemas
const schemas = {
  register: Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),

  createPost: Joi.object({
    title: Joi.string().min(1).max(200).required(),
    content: Joi.string().min(1).required(),
    tags: Joi.array().items(Joi.string()).default([]),
    coverImage: Joi.string().uri().allow(''),
    category: Joi.string().default('Uncategorized'),
    status: Joi.string().valid('draft', 'published').default('draft'),
  }),

  updatePost: Joi.object({
    title: Joi.string().min(1).max(200),
    content: Joi.string().min(1),
    tags: Joi.array().items(Joi.string()),
    coverImage: Joi.string().uri().allow(''),
    category: Joi.string(),
    status: Joi.string().valid('draft', 'published'),
  }),

  createComment: Joi.object({
    content: Joi.string().min(1).max(1000).required(),
  }),

  updateProfile: Joi.object({
    name: Joi.string().min(2).max(50),
    bio: Joi.string().max(500),
    location: Joi.string().max(100),
    website: Joi.string().uri().allow(''),
    socialLinks: Joi.object({
      twitter: Joi.string().allow(''),
      linkedin: Joi.string().allow(''),
      github: Joi.string().allow(''),
    }),
    interests: Joi.array().items(Joi.string()),
  }),
};

// Validation middleware factory
export const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: true,
    });

    if (error) {
      const errorMessage = error.details.map(detail => detail.message).join(', ');
      return res.status(400).json({
        message: 'Validation error',
        errors: errorMessage,
      });
    }

    req.body = value; // Use sanitized values
    next();
  };
};

export { schemas };
