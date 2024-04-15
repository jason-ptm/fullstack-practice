const { DataTypes, Sequelize, Model } = require("sequelize");

const ACCOUNT_TABLE = "accounts";

const AccountSchema = {
  id: {
    allowNull: true,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: Sequelize.literal("gen_random_uuid()"),
  },
  email: {
    unique: true,
    allowNull: false,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  createdAt: {
    field: "created_at",
    allowNull: true,
    type: "TIMESTAMP",
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  },
  updatedAt: {
    field: "updated_at",
    allowNull: true,
    type: "TIMESTAMP",
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  },
  deletedAt: {
    field: "deleted_at",
    allowNull: true,
    type: "TIMESTAMP",
  },
};

class Account extends Model {
  static associate(models) {
    this.hasOne(models.User, {
      as: "user",
      foreignKey: "accountId",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ACCOUNT_TABLE,
      modelName: "Account",
      paranoid: true,
    };
  }
}

module.exports = {
  ACCOUNT_TABLE,
  AccountSchema,
  Account,
};
