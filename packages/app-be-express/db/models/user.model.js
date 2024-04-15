const { DataTypes, Sequelize, Model } = require("sequelize");
const { ACCOUNT_TABLE } = require("../models/account.model");

const USER_TABLE = "users";

const UserSchema = {
  id: {
    allowNull: true,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: Sequelize.literal("gen_random_uuid()"),
  },
  fullName: {
    field: "full_name",
    allowNull: false,
    type: DataTypes.STRING,
  },
  age: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  accountId: {
    field: "account_id",
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: ACCOUNT_TABLE,
      key: "id",
    },
  },
};

class User extends Model {
  static associate(models) {
    this.belongsTo(models.Account);
    this.hasMany(models.Post, {
      as: "posts",
      foreignKey: "userId",
    });
    this.hasMany(models.Interaction, {
      as: "likes",
      foreignKey: "userId",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: "User",
      timestamps: false,
    };
  }
}

module.exports = {
  USER_TABLE,
  UserSchema,
  User,
};
