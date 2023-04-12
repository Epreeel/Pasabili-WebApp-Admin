require('dotenv').config("./.env");
const express = require('express');
const jwt = require('jsonwebtoken');
var C = require("crypto-js");
const Admin = require("../models/admin");
const admin = require('firebase-admin');
const db = admin.firestore();

const adminCollection = db.collection('Admins');

exports.changeGeneral = async(req, res) => {
   
    jwt.verify(req.body.accessToken, process.env.ACCESS_TOKEN_SECRET, async(err, decoded)=>{
        // Parse admin ID from JWT payload
        const adminId = JSON.parse(decoded.admin_id).admin_id;
        
        // Get admin document reference by ID
        const adminRef = adminCollection.doc(adminId);
        
        // Get admin document snapshot
        const adminSnapshot = await adminRef.get();
        
        // Check if admin exists
        if(adminSnapshot.exists){
            // Update admin document with new data
            const updateResult = await adminRef.update({
                fname: req.body.fname,
                lname: req.body.lname
            });
            if(updateResult.writeTime !== null){
                // Get updated admin data and generate new access token
                const updatedAdmin = (await adminRef.get()).data();
                const accessToken = generateAccessToken(updatedAdmin);
                res.send({success:true,message:"Update General Info successfully.",data:{updatedAdmin,accessToken}});
            }else{
                res.send({success:false,message:"Failed to update General Info.",data:null});
            }
        }else{
            res.send({success:false,message:"Admin not found.",data:null});
        }
    })
}