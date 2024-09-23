const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const authJwt = require('../helpers/jwt');
const errorHandler = require('../helpers/error-handler');

function setupMiddleware(app) {
  app.use(cors());
  app.options('*', cors());
  app.use(bodyParser.json());
  app.use(morgan('tiny'));
  app.use(authJwt());
  app.use(errorHandler);
}

module.exports = { setupMiddleware };