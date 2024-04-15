const { URI } = require("./../libs/postgres.pool");

module.exports = {
  development: {
    url: URI,
    dialect: "postgres",
  },
};
