const { DataTypes, Sequelize, Model } = require("sequelize");

const USER_TABLE = "users";

const UserSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUIDV4,
    defaultValue: Sequelize.UUIDV4,
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
};

class User extends Model {
  static associate(models) {
    this.belongsTo(models.Account, {
      as: "account",
    });
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
      timeStamps: true,
    };
  }
}

module.exports = {
  USER_TABLE,
  UserSchema,
  User,
};
