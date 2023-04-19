'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('vehicles', {
      vehicle_id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      itinerant_id: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      license_plate: {
        type: Sequelize.STRING,
        allowNull: false
      },
      vehicle_type: {
        type: Sequelize.ENUM('MOTOR', 'CAR', 'BIKE', 'NONE'),
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    }).then(() => queryInterface.addConstraint('vehicles', {
      fields: ['itinerant_id'],
      type: 'FOREIGN KEY',
      name: 'FK_vehicles_itinerant', // useful if using queryInterface.removeConstraint
      references: {
        table: 'users',
        field: 'user_id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }))
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("vehicles");
  }
};
