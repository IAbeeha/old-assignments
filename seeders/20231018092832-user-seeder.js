"use strict";
const bcrypt = require("bcrypt");
require("dotenv").config();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "user",
      [
        {
          name: "Abeeha",
          email: "abeeha1@gmail.com",
          password: bcrypt.hashSync("12345", process.env.salt),
        },
        {
          name: "Abera",
          email: "Abera@gmail.com",
          password: bcrypt.hashSync("12345", process.env.salt),
        },
        {
          name: "alex",
          email: "alex@gmail.com",
          password: bcrypt.hashSync("12345", process.env.salt),
        },
        {
          name: "ali",
          email: "ali@gmail.com",
          password: bcrypt.hashSync("12345", process.env.salt),
        },
        {
          name: "zara",
          email: "zara@gmail.com",
          password: bcrypt.hashSync("12345", process.env.salt),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("user", null, {});
  },
};
