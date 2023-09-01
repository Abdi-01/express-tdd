const { productsController } = require("../controllers");

const route = require("express").Router();

route.post("/", productsController.getProducts);

module.exports = route;
