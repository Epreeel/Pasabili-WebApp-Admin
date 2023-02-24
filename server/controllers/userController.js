require('dotenv').config("./.env");
const admin = require("../models/admin");
const user = require("../models/user");
const address = require("../models/address");
const express = require('express');
const jwt = require('jsonwebtoken');
var C = require("crypto-js");
const { Op, Sequelize } = require('sequelize');
var moment = require('moment');
const { generateAdminAccessToken } = require('../helpers/generateAdminAccessToken');

exports.login = async (req, res) => {
    let data = await admin.model.findOne({
        where: {
            email: req.body.email,
            status: true
        }
    })
    if (data !== null) {
        var bytes = C.AES.decrypt(data.password, process.env.SECRET_KEY);
        var originalText = bytes.toString(C.enc.Utf8);
        if (originalText === req.body.password && data.password != "") {
            const accessToken = generateAdminAccessToken(data);
            res.send({ success: true, message: "Login Successful!", data: data, accessToken })
        } else {
            res.send({ success: false, message: "The credentials provided does not match." });
        }
    } else {
        res.send({ success: false, message: "Account not found." });
    }
}

exports.logout = async (req, res) => {
    res.status(200).json("You logged out Successfully");
}


exports.registerAdmin = async (req, res) => {
    let data = await admin.model.findAll({
        where: {
            email: req.body.email
        }
    })

    if (data.length === 0) {
        req.body.password = "p@ssw0rd";
        var hash = C.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();
        req.body.password = hash;
        let admin_address = await address.model.create({
            street: req.body.street,
            barangay: req.body.barangay,
            town: req.body.town,
            postal_code: req.body.postal_code
        });
        console.log(admin_address);
        await admin.model.create({
            address_id : admin_address.address_id,
            email : req.body.email,
            fname : req.body.fname,
            lname : req.body.lname,
            password : req.body.password,
            contact_no : req.body.contact,
            status : req.body.status
        });
        res.send({success:true,message:"Successfully Register!"});
    } else {
        res.send({success:false,message:"Account already exist!"});
    }

}

exports.getAllAdminAndItinerant = async (req, res) => {
    let admins = await admin.model.findAll({
        order: [['createdAt','DESC']],
        where:{
            status:true
        },
        include:[{
            model: address.model, as:"adminAddress"
        }]
    })

    let itinerants = await user.model.findAll({
        where: {
            user_type:"ITINERANT",
            status:true
        },
        include:[{
            model: address.model, as:"userAddress"
        }]
    })

    let inactiveItinerants = await user.model.findAll({
        where: {
            user_type:"ITINERANT",
            status:false
        },
        include:[{
            model: address.model, as:"userAddress"
        }]
    })

    let inactiveAdmins = await admin.model.findAll({
        where: {
            status:false
        },
        include:[{
            model: address.model, as:"adminAddress"
        }]
    })
    const inactives = [...inactiveItinerants, ...inactiveAdmins];

    res.send({success:true,data:{admins:admins,itinerants:itinerants,inactives:inactives}});
}

