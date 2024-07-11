'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user_credentials', [
      {
        id: 1,
        userId: '1',
        email: 'nuriabonelquesada@gmail.com',
        password: '$2a$08$En.gZTIRQJU8EHFO.UjK3OFwhW/zX2.jL8fHo9tpEc5jTTg4tJwPW',
        lastPasswordChange: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_credentials', null, {})
  }
}
