const {DataTypes} = require('sequelize');
const instance = require('../connection');

const order = instance.sequelize.define("orders",{
    order_id:{
        type:DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull:  false,
    },
    customer_id:{
        type:DataTypes.BIGINT,
        allowNull: false
    },
    itinerant_id:{
        type:DataTypes.BIGINT,
        allowNull: false
    },
    pickup_address_id:{
        type:DataTypes.BIGINT,
        allowNull: false
    },
    dropoff_address_id:{
        type:DataTypes.BIGINT,
        allowNull: false
    },
    order_status:{
        type: DataTypes.ENUM('PENDING', 'IN PROGRESS', 'COMPLETED'),
        allowNull:false
    },

},{
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    tableName: "orders"
}

);
exports.model = order;