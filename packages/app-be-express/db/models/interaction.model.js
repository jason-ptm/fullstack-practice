const { DataTypes, Sequelize, Model } = require("sequelize");
const { POST_TABLE } = require("../models/post.model");
const { USER_TABLE } = require("../models/user.model");

const INTERACTION_TABLE = "interactions";

const InteractionSchema = {
  id: {
    allowNull: true,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: Sequelize.Sequelize.literal("gen_random_uuid()"),
  },
  postId: {
    field: "post_id",
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: POST_TABLE,
      key: "id",
    },
  },
  userId: {
    field: "user_id",
    allowNull: false,
    type: DataTypes.UUID,
    references: {
      model: USER_TABLE,
      key: "id",
    },
  },
};

class Interaction extends Model {
  static associate(models) {
    this.belongsTo(models.Post, {
      as: "post",
    });
    this.belongsTo(models.User, {
      as: "user",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: INTERACTION_TABLE,
      modelName: "Interaction",
      timestamps: false,
    };
  }
}

module.exports = {
  INTERACTION_TABLE,
  InteractionSchema,
  Interaction,
};
