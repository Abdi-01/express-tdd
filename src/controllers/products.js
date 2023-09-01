const models = require("../models");
const sequelize = require("sequelize");
const { products } = models;

module.exports = {
  getProducts: async (req, res, next) => {
    try {
      let get = await products.findAll();
      return res.status(200).send({
        success: true,
        data: get,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
