const express = require('express');
const app = express();

const { setupMiddleware } = require('./config/middleware');
const { setupRoutes } = require('./config/routes');
const { connectToDatabase } = require('./config/database');

setupMiddleware(app);
setupRoutes(app);
connectToDatabase();

module.exports = app;