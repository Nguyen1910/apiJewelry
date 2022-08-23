"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, OrderDetail, AllCode, Delivery }) {
      // define association here
      this.belongsTo(User);
      this.hasMany(OrderDetail, {
        foreignKey: "orderId",
      });
      this.belongsTo(AllCode);
      this.belongsTo(Delivery);
    }
  }
  Order.init(
    {
      allCodeId: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      total: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      deliveryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
