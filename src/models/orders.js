'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  orders.init({
    invoice: DataTypes.UUID,
    userId: DataTypes.NUMBER,
    addressId: DataTypes.NUMBER,
    total: DataTypes.NUMBER,
    ongkir: DataTypes.NUMBER,
    status: DataTypes.STRING,
    note: DataTypes.STRING,
    paymentproof: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'orders',
  });
  return orders;
};