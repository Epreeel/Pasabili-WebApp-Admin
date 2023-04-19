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
    await queryInterface.createTable('orders', {
      order_id: {
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
      pickup_address_id: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      dropoff_address_id: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      order_status: {
        type: Sequelize.ENUM('PENDING', 'IN PROGRESS', 'COMPLETED'),
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
    }).then(() => queryInterface.addConstraint('orders', {
      fields: ['customer_id'],
      type: 'FOREIGN KEY',
      name: 'FK_orders_customer', // useful if using queryInterface.removeConstraint
      references: {
        table: 'users',
        field: 'user_id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })).then(() => queryInterface.addConstraint('orders', {
      fields: ['itinerant_id'],
      type: 'FOREIGN KEY',
      name: 'FK_orders_itinerant', // useful if using queryInterface.removeConstraint
      references: {
        table: 'users',
        field: 'user_id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })).then(() => queryInterface.addConstraint('orders', {
      fields: ['pickup_address_id'],
      type: 'FOREIGN KEY',
      name: 'FK_orders_pickup', // useful if using queryInterface.removeConstraint
      references: {
        table: 'addresses',
        field: 'address_id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })).then(() => queryInterface.addConstraint('orders', {
      fields: ['dropoff_address_id'],
      type: 'FOREIGN KEY',
      name: 'FK_orders_dropoff', // useful if using queryInterface.removeConstraint
      references: {
        table: 'addresses',
        field: 'address_id',
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
    await queryInterface.dropTable("orders");
  }
};
