const {DataTypes} = require('sequelize');
const instance = require('../connection');

const transaction = instance.sequelize.define("transactions",{
    transaction_id:{
        type:DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull:  false,
    },
    order_id:{
        type:DataTypes.BIGINT,
        allowNull: false
    },
    amount:{
        type:DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    payment_method:{
      type: DataTypes.ENUM('PAYPAL'),
      allowNull:false
    },
    status:{
        type:DataTypes.BOOLEAN,
        allowNull: false
    }
},{
    createdAt: true,
    deletedAt: true,
    tableName: "transactions"
}

);
exports.model = transaction;