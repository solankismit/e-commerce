const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const authJwt = require("../helpers/jwt");
const errorHandler = require("../helpers/error-handler");
const path = require("path");

function setupMiddleware(app) {
  app.use(cors());
  app.options("*", cors());
  app.use(bodyParser.json());
  app.use(morgan("tiny"));
  app.use(authJwt());
  app.use(
    "/public/uploads",
    express.static(__dirname + "/../../public/uploads/")
  );
  app.use(errorHandler);
}

module.exports = { setupMiddleware };
