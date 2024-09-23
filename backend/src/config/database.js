const mongoose = require('mongoose');
const { CONNECTION_STRING } = require('./constants');

async function connectToDatabase() {
  try {
    await mongoose.connect(CONNECTION_STRING, { dbName: 'ecommerce-database' });
    console.log('Database connection is established');
  } catch (err) {
    console.error('Database connection failed:', err);
  }
}

module.exports = { connectToDatabase };