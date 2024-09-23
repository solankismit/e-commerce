const {expressjwt} = require("express-jwt");
const { PASSWORD_SECRET, API_URL } = require("../config/constants");
const { json } = require("body-parser");

function authJwt() {
  
  return expressjwt({
    secret: PASSWORD_SECRET,
    algorithms: ["HS256"],
    isRevoked: isRevoked
  }).unless({
    path:[
      {
        url:/\/api\/v1\/products(.*)/,methods:['GET','OPTIONS']
      },
      {
        url:/\/api\/v1\/categories(.*)/,methods:['GET','OPTIONS']
      },
      `${API_URL}/users/login`,
      `${API_URL}/users/register`
    ]
  });
}


async function isRevoked(req, payload) {
  if ((payload).payload.isAdmin === false) {
    return true;
  }
  return false;
}
module.exports = authJwt;
