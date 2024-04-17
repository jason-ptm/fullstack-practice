const Joi = require("joi");

const id = Joi.string().label("id").guid();
const title = Joi.string().label("título").max(50);
const content = Joi.string().label("contenido").max(250);

const getPostSchema = Joi.object({
  id: id.required(),
});

const deletePostSchema = Joi.object({
  ownerId: id.required(),
});

const createPostSchema = Joi.object({
  title: title.required(),
  content: content.required(),
  userId: id.required(),
});

const updatePostSchema = Joi.object({
  data: Joi.object({
    title,
    content,
  }),
  ownerId: id.required(),
});

const likePostSchema = Joi.object({
  userId: id.required(),
  postId: id.required(),
});

module.exports = { getPostSchema, createPostSchema, updatePostSchema, deletePostSchema, likePostSchema };
