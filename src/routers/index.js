// #import Router
const productsRouter = require("./products");
const tranactionRouter = require("./transaction");

const router = require("express").Router();

// Type router here ⬇️
// EXAMPLE : router.use("/users", usersRouter);
router.use("/products", productsRouter);
router.use("/transaction", tranactionRouter);

module.exports = router;
