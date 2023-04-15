require('dotenv').config("./.env");
const express = require('express');
const jwt = require('jsonwebtoken');
var C = require("crypto-js");
const Admin = require("../models/admin");
const admin = require('firebase-admin');
const db = admin.firestore();
const { generateAdminAccessToken } = require('../helpers/generateAdminAccessToken');

const adminCollection = db.collection('Admins');

exports.changeGeneral = async (req, res) => {

    if (req.body.accessToken != undefined) {
        jwt.verify(req.body.accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
            // Parse admin ID from JWT payload
            const adminId = JSON.parse(decoded.admin_id).admin_id;
            console.log(adminId);
            // Get admin document reference by ID
            const adminRef = adminCollection.doc(adminId);

            // Get admin document snapshot
            const adminSnapshot = await adminRef.get();

            // Check if admin exists
            if (adminSnapshot.exists) {
                // Update admin document with new data
                const updateResult = await adminRef.update({
                    firstname: req.body.firstname,
                    lastname: req.body.lastname
                });
    
                if (updateResult.writeTime !== null) {
                    // Get updated admin data and generate new access token
                    const updatedAdminData = adminSnapshot.data();
                    const updatedAdmin = new Admin(updatedAdminData, adminId);
                    console.log(updatedAdmin);
                    const accessToken = generateAdminAccessToken(updatedAdmin);
                    res.cookie('admin_id', accessToken, { maxAge: 900000, httpOnly: true });                    
                    res.send({ success: true, message: "Update General Info successfully.", data: { updatedAdmin, accessToken } });
                } else {
                    res.send({ success: false, message: "Failed to update General Info.", data: null });
                }
            } else {
                res.send({ success: false, message: "Admin not found.", data: null });
            }
        })
    }
}

exports.changeProfilePhotoOnly = async (req, res) => {
    if (req.body.accessToken != undefined) {
        jwt.verify(req.body.accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
            const adminId = JSON.parse(decoded.admin_id).admin_id;
            const adminRef = adminCollection.doc(adminId);
            const adminSnapshot = await adminRef.get();

            if (adminSnapshot.exists) {
                const updateResult = await adminRef.update({ image: req.body.image });

                if (updateResult.writeTime !== null) {
                    const updatedAdmin = (await adminRef.get()).data();
                    const accessToken = generateAdminAccessToken(updatedAdmin);
                    res.send({ success: true, message: "Profile photo updated successfully.", data: { admin: updatedAdmin, accessToken } });
                } else {
                    res.send({ success: false, message: "Failed to update profile photo.", data: null });
                }
            } else {
                res.send({ success: false, message: "Admin not found.", data: null });
            }
        })
    }
}