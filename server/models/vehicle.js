const {DataTypes} = require('sequelize');
const instance = require('../connection');

const vehicle = instance.sequelize.define("vehicles",{
    vehicle_id:{
        type:DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull:  false,
    },
    itinerant_id:{
        type:DataTypes.BIGINT,
        allowNull: false
    },
    license_plate:{
        type:DataTypes.STRING,
        allowNull: false
    },
    vehicle_type:{
        type: DataTypes.ENUM('MOTOR', 'CAR', 'BIKE', 'NONE'),
        allowNull:false
    }
},{
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    tableName: "vehicles"
}

);
exports.model = vehicle;