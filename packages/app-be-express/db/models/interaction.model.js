const { DataTypes, Sequelize, Model } = require("sequelize");

const INTERACTION_TABLE = "interactions";

const InteractionSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUIDV4,
    defaultValue: Sequelize.UUIDV4,
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
      timeStamps: false,
    };
  }
}

module.exports = {
  INTERACTION_TABLE,
  InteractionSchema,
  Interaction,
};
