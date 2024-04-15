const { DataTypes, Sequelize, Model } = require("sequelize");
const { USER_TABLE } = require("../models/user.model");

const POST_TABLE = "posts";

const PostSchema = {
  id: {
    allowNull: true,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  content: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  userId: {
    field: "user_id",
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: USER_TABLE,
      key: "id",
    },
  },
  createdAt: {
    field: "created_at",
    allowNull: true,
    type: DataTypes.DATE,
    defaultValue: Sequelize.Sequelize.fn("NOW"),
  },
  updatedAt: {
    field: "updated_at",
    allowNull: true,
    type: DataTypes.DATE,
    defaultValue: Sequelize.Sequelize.fn("NOW"),
  },
  deletedAt: {
    field: "deleted_at",
    allowNull: true,
    type: DataTypes.DATE,
    defaultValue: null,
  },
};

class Post extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      as: "owner",
    });
    this.hasMany(models.Interaction, {
      as: "interactions",
      foreignKey: "postId",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: POST_TABLE,
      modelName: "Post",
      timestamps: true,
    };
  }
}

module.exports = {
  POST_TABLE,
  PostSchema,
  Post,
};
