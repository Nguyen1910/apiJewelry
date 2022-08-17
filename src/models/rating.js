"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Product, User }) {
      // define association here
      this.belongsTo(Product);
      this.belongsTo(User);
    }
  }
  Rating.init(
    {
      productId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      comment: DataTypes.TEXT,
      rate: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Rating",
    }
  );
  return Rating;
};
