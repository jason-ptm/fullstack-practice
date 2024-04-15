const { models } = require("../libs/sequelize");
const boom = require("@hapi/boom");

class PostService {
  constructor() {}

  async create(data) {
    const post = await models.Post.create(data);
    return post;
  }

  async getOne(id) {
    const post = await models.Post.findByPk(id);

    if (!post) throw new boom.notFound("Not found");

    return post;
  }

  async getAll() {
    const post = await models.Post.findAll();
    return post;
  }

  async delete(id) {
    const model = await this.getOne(id);

    if (model.deletedAt) throw new boom.notFound("Not found");

    await model.destroy();
    return model.id;
  }

  async update(id, data) {
    const model = await this.getOne(id);
    const post = await model.update(data);
    return { id: post.id };
  }
}

module.exports = PostService;
