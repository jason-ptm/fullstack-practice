const jwt = require("jsonwebtoken");
const { config } = require("../config/config");

const signToken = (payload) => {
  return jwt.sign(payload, config.jwtSecret);
};

module.exports = signToken;
