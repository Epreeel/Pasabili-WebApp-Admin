const {DataTypes} = require('sequelize');
const instance = require('../connection');

const rating = instance.sequelize.define("ratings",{
    rating_id:{
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
    rating:{
      type: DataTypes.ENUM('1', '2', '3', '4', '5'),
      allowNull:false
    },
    review:{
        type:DataTypes.STRING,
        allowNull: false
    }
},{
    createdAt: true,
    tableName: "ratings"
}

);
exports.model = rating;