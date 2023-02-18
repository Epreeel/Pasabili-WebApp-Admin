const {DataTypes} = require('sequelize');
const instance = require('../connection');

const admin = instance.sequelize.define("admins",{
    admin_id:{
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    address_id:{
        type:DataTypes.BIGINT,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    fname:{
        type: DataTypes.STRING,
        allowNull: false
    },
    lname:{
        type: DataTypes.STRING,
        allowNull: false
    },
    image:{
        type: DataTypes.STRING,
        allowNull: true
    },
    contact_no:{
        type: DataTypes.STRING,
        allowNull: true
    },
    birthday:{
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    gender:{
        type: DataTypes.ENUM('MALE','FEMALE'),
        allowNull: true
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    status:{
        type:DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
},{
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    tableName: "admins"
}
);
exports.model = admin;