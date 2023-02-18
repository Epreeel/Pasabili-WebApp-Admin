const {DataTypes} = require('sequelize');
const instance = require('../connection');

const concern = instance.sequelize.define("concerns",{
    concern_id:{
        type:DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull:  false,
    },
    user_id:{
        type:DataTypes.BIGINT,
        allowNull: false
    },
    attachment_line_id:{
        type:DataTypes.BIGINT,
        allowNull: false
    },
    subject:{
        type:DataTypes.STRING,
        allowNull: false
    },
    message:{
        type:DataTypes.TEXT,
        allowNull: false
    },
    concern_type:{
      type: DataTypes.ENUM('ITINERANT','CUSTOMER'),
      allowNull:true
    },
    status:{
        type:DataTypes.BOOLEAN,
        allowNull: false
    }
},{
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    tableName: "concerns"
}

);
exports.model = concern;