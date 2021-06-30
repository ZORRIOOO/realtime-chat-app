'use strict';

const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Users', [
      {
        firstName: 'Max',
        lastName: 'Schneider',
        email: 'max.schneider@gmail.com',
        password: bcrypt.hashSync('password', 10),
        gender: 'male'
      },
      {
        firstName: 'Sam',
        lastName: 'Schneider',
        email: 'sam.schneider@gmail.com',
        password: bcrypt.hashSync('password', 10),
        gender: 'male'
      },
      {
        firstName: 'Ann',
        lastName: 'Robbie',
        email: 'ann.robbie@gmail.com',
        password: bcrypt.hashSync('password', 10),
        gender: 'female'
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

     await queryInterface.bulkDelete('Users', null, {});
  }
};
