const { transactionController } = require("../controllers");

const route = require("express").Router();

route.post("/add/cart", transactionController.addToCart);

module.exports = route;
