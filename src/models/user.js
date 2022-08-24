"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Order, AllCode, Delivery, Rating }) {
      // define association here
      this.hasMany(Order, {
        foreignKey: "userId",
      });
      this.hasMany(Delivery, {
        foreignKey: "userId",
      });
      this.belongsTo(AllCode, {
        foreignKey: "allCodeId",
      });
      this.hasMany(Rating, {
        foreignKey: "userId",
      });
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      password: DataTypes.STRING,
      avatar: DataTypes.BLOB,
      allCodeId: DataTypes.STRING,
      isDeleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
