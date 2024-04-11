const { DataTypes, Sequelize, Model } = require("sequelize");

const ACCOUNT_TABLE = "accounts";

const AccountSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUIDV4,
    defaultValue: Sequelize.UUIDV4,
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
};

class Account extends Model {
  static associate(models) {
    this.hasOne(models.User, {
      as: "user",
      foreignKey: "userId",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ACCOUNT_TABLE,
      modelName: "Account",
      timeStamps: true,
    };
  }
}

module.exports = {
  ACCOUNT_TABLE,
  AccountSchema,
  Account,
};
