
const productsRoutes = require('../routers/products');
const categoriesRoutes = require('../routers/categories');
const usersRoutes = require('../routers/users');
const authRoutes = require('../auth/authRoutes');
const ordersRoutes = require('../routers/orders');
const { API_URL } = require('./constants');

function setupRoutes(app) {
  app.use(`${API_URL}/products`, productsRoutes);
  app.use(`${API_URL}/categories`, categoriesRoutes);
  app.use(`${API_URL}/users`, usersRoutes);
  app.use(`${API_URL}/auth`, authRoutes);
  app.use(`${API_URL}/orders`, ordersRoutes);
}

module.exports = { setupRoutes };