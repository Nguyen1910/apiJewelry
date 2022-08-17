"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Category, Brand, OrderDetail, Rating }) {
      // define association here
      this.belongsTo(Category);
      this.belongsTo(Brand);
      this.hasMany(OrderDetail, {
        foreignKey: "productId",
      });
      this.hasMany(Rating, {
        foreignKey: "productId",
      });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      discount: DataTypes.INTEGER,
      image1: DataTypes.BLOB,
      image2: DataTypes.BLOB,
      image3: DataTypes.BLOB,
      image4: DataTypes.BLOB,
      material: DataTypes.STRING,
      gender: DataTypes.BOOLEAN,
      size: DataTypes.STRING,
      amount: DataTypes.INTEGER,
      color: DataTypes.STRING,
      brandId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
