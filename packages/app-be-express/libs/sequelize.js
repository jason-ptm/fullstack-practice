const { Sequelize } = require("sequelize");
const { config } = require("../config/config");

const setUpModels = require("../db/models");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}/${config.dbName}`;

const options = {
  dialect: "postgres",
  logging: true,
};

const sequelize = new Sequelize(URI, options);

setUpModels(sequelize);

module.exports = sequelize;
