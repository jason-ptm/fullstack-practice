const { DataTypes, Sequelize, Model } = require("sequelize");

const POST_TABLE = "posts";

const PostSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUIDV4,
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
};

class Post extends Model {
  static associate(models) {
    this.belongsTo(models.user, {
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
      timeStamps: true,
    };
  }
}

module.exports = {
  POST_TABLE,
  PostSchema,
  Post,
};
