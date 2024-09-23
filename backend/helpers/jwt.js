const expressJwt = require("express-jwt");
const { PASSWORD_SECRET } = require("../contants");

function authJwt() {
  return expressJwt({
    secret: PASSWORD_SECRET,
    algorithms: ["HS256"],
  });
}

module.exports = authJwt;
