const { models } = require("../libs/sequelize");

class Interaction {
  constructor() {}

  async getOne(postId, userId) {
    const data = await models.Interaction.findOne({
      where: {
        postId,
        userId,
      },
    });

    return data;
  }

  async toggleLike(data) {
    const like = await this.getOne(data.postId, data.userId);
    if (like) {
      await like.destroy();
      return { like: false };
    }
    await models.Interaction.create(data);
    return { like: true };
  }
}

module.exports = Interaction;
