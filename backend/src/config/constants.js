require("dotenv").config();

module.exports = {
  API_URL: process.env.API_URL || "/api/v1",
  CONNECTION_STRING: process.env.CONNECTION_STRING,
  PASSWORD_SECRET: process.env.PASSWORD_SECRET || "secret-password",
  PORT: process.env.PORT || 5001,
};
