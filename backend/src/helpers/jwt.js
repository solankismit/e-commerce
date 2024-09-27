const { expressjwt } = require("express-jwt");
const { PASSWORD_SECRET, API_URL } = require("../config/constants");
const { json } = require("body-parser");

function authJwt() {
  return expressjwt({
    secret: PASSWORD_SECRET,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: [
      {
        url: /\/public\/uploads(.*)/,
        methods: ["GET", "OPTIONS"],
      },
      {
        url: /\/api\/v1\/products(.*)/,
        methods: ["GET", "OPTIONS"],
      },
      {
        url: /\/api\/v1\/categories(.*)/,
        methods: ["GET", "OPTIONS"],
      },
      `${API_URL}/auth/login`,
      `${API_URL}/auth/register`,
    ],
  });
}

async function isRevoked(req, payload) {
  console.log(`Checking if revoked for path: ${req.path}`); // Debugging line
  if (payload.payload.isAdmin === false) {
    return true;
  }
  return false;
}
module.exports = authJwt;
