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
    await queryInterface.createTable('ratings', {
      rating_id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      customer_id: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      itinerant_id: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      rating: {
        type: Sequelize.ENUM('1', '2', '3', '4', '5'),
        allowNull: false
      },
      review: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    }).then(() => queryInterface.addConstraint('ratings', {
      fields: ['customer_id'],
      type: 'FOREIGN KEY',
      name: 'FK_ratings_customer', // useful if using queryInterface.removeConstraint
      references: {
        table: 'users',
        field: 'user_id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })).then(() => queryInterface.addConstraint('ratings', {
      fields: ['itinerant_id'],
      type: 'FOREIGN KEY',
      name: 'FK_ratings_itinerant', // useful if using queryInterface.removeConstraint
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
    await queryInterface.dropTable('ratings');
  }
};
