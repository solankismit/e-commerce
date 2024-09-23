const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv/config");
const { API_URL, CONNECTION_STRING } = require("./contants");

app.use(cors());
app.options("*", cors());

// middleware
app.use(bodyParser.json()); //to ready req data
app.use(morgan("tiny")); //To log requests

// Routes
const productsRoutes = require("./routers/products");
const categoriesRoutes = require("./routers/categories");
const usersRoutes = require("./routers/users");
const ordersRoutes = require("./routers/orders");

const api = API_URL;

app.use(`${api}/products`, productsRoutes);
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

// Database Connection
mongoose
  .connect(CONNECTION_STRING, { dbName: "ecommerce-database" })
  .then(() => {
    console.log("Database Connection is done");
  })
  .catch((err) => {
    console.log(err);
  });

// Server
app.listen(3000, () => {
  console.log("server is running on http://localhost:3000");
});
