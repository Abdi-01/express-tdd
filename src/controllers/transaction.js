const models = require("../models");
const sequelize = require("sequelize");
const { cart, products } = models;

module.exports = {
  addToCart: async (req, res, next) => {
    try {
      let get = await products.findOne({
        where: { id: req.body?.productId },
      });
      let getCart = await cart.findOne({
        where: { productId: req.body?.productId },
      });
      if (getCart?.dataValues?.id) {
        if ((req.body?.qty + getCart.dataValues.qty) <= get.dataValues.stock) {
          await cart.update(
            {
              qty: req.body?.qty + getCart.dataValues.qty,
            },
            {
              where: { id: getCart.dataValues.id },
            }
          );
        } else {
          return next({
            status: 400,
            success: false,
            message: "Not enough stock",
          });
        }
      } else {
        if (req.body?.qty <= get.dataValues.stock) {
          await cart.create(req.body);
        } else {
          return next({
            status: 400,
            success: false,
            message: "Not enough stock",
          });
        }
      }
      
      return res.status(200).send({
        success: true,
        message: "Add to cart success",
      });
    } catch (error) {
      console.log(error);
      next({
        status: 500,
        success: false,
        message: "Add to cart error",
      });
    }
  },
};
