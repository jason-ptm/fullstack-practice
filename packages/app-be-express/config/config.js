require("dotenv").config();

const config = {
  port: process.env.PORT || 3000,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  dbUser: process.env.DB_USER,
  dbName: process.env.DB_NAME,
  dbHost: process.env.DB_HOST,
  dbPassword: process.env.DB_PASSWORD,
  jwtSecret: process.env.JWT_SECRET,
};

module.exports = { config };
