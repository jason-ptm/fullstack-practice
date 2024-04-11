const { Sequelize } = require("sequelize");
const { URI } = require("./postgres.pool");
const setUpModels = require("../db/models");

const options = {
  dialect: "postgres",
  logging: true,
};

const sequelize = new Sequelize(URI, options);

setUpModels(sequelize);

module.exports = sequelize;
