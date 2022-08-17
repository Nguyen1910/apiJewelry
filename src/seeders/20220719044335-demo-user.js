"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        firstName: "Mai",
        lastName: "Nguyên",
        email: "nguyen191000@gmail.com",
        phone: "0934123456",
        address: "TP Hồ Chí Minh",
        password: "123456",
        avatar: null,
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
