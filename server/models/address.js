const {DataTypes} = require('sequelize');
const instance = require('../connection');

const address = instance.sequelize.define("addresses",{
    address_id:{
        type:DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull:  false,
    },
    street:{
        type:DataTypes.STRING,
        allowNull: false
    },
    barangay:{
        type:DataTypes.STRING,
        allowNull: false
    },
    town:{
        type:DataTypes.STRING,
        allowNull: false
    },
    postal_code:{
        type:DataTypes.STRING,
        allowNull: false
    },
    
},{
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    tableName: "addresses"
}

);
exports.model = address;