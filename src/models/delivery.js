"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Delivery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Order }) {
      // define association here
      this.belongsTo(User);
      this.hasMany(Order, {
        foreignKey: "deliveryId",
      });
    }
  }
  Delivery.init(
    {
      staffId: DataTypes.INTEGER,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Delivery",
    }
  );
  return Delivery;
};
