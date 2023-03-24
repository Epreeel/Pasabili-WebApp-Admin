
require('dotenv').config("./.env");
const Admin = require("../models/admin");
var C = require("crypto-js");
const { generateAdminAccessToken } = require('../helpers/generateAdminAccessToken');

const admin = require('firebase-admin');
const db = admin.firestore();
exports.getAllCustomers = async (req, res) => {
    try {
      const customersSnapshot = await db.collection('Customers')
        .where('status', '==', true)
        .orderBy('createdAt', 'desc')
        .get();
      const customers = customersSnapshot.docs.map(doc => doc.data());
  
      const inactiveCustomersSnapshot = await db.collection('customers')
        .where('status', '==', false)
        .get();
      const inactiveCustomers = inactiveCustomersSnapshot.docs.map(doc => doc.data());
  
      res.send({ success: true, data: { customers, inactiveCustomers } });
    } catch (error) {
      console.error(error);
      res.send({ success: false, message: error.message });
    }
  }


// // deactivates admin it checks whether the password is equal to the password inputted in the modal
// exports.deactivateCustomer = async (req, res) => {
//     jwt.verify(req.body.accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {

//         // If JWT contains an admin ID
//         var decodedData = JSON.parse(decoded.admin_id);
//         var bytes = C.AES.decrypt(decodedData.password, process.env.SECRET_KEY);
//         var originalText = bytes.toString(C.enc.Utf8);
        
//         const userRecord = await user.model.findOne({
//             where: {
//                 user_type: "CUSTOMER",
//                 email: req.body.email
//             }
//         });
//         if (userRecord && originalText === req.body.password) {
//             await user.model.update({ status: false }, {
//                 where: {
//                     email: req.body.email
//                 }
//             })
//             res.send({ success: true, message: "Successfully deactivated customer." });
//         } else {
//             res.send({ success: false, message: "Invalid email or password", data: null });
//         }
//     })

// }


// exports.reactivateCustomer = async (req, res) => {
//     jwt.verify(req.body.accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {

//         // If JWT contains an admin ID
//         var decodedData = JSON.parse(decoded.admin_id);
//         var bytes = C.AES.decrypt(decodedData.password, process.env.SECRET_KEY);
//         var originalText = bytes.toString(C.enc.Utf8);
//         const userRecord = await user.model.findOne({
//             where: {
//                 user_type: "CUSTOMER",
//                 email: req.body.email
//             }
//         });
//         if (userRecord && originalText === req.body.password) {
//             await user.model.update({ status: true }, {
//                 where: {
//                     email: req.body.email
//                 }
//             })
//             res.send({ success: true, message: "Successfully reactivated customer." });
//         } else {
//             res.send({ success: false, message: "Invalid email or password", data: null });
//         }
//     })

// }


