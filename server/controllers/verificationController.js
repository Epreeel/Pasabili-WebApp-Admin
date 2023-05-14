
const Verification = require("../models/verification");
var C = require("crypto-js");
const jwt = require('jsonwebtoken');
const admin = require('firebase-admin');
const db = admin.firestore();

const verificationCollection = db.collection('Verification');
const customerCollection = db.collection('Users');
const itinerantCollection = db.collection('Itinerants');
exports.getAllVerifications = async (req, res) => {
  const verificationsSnapshot = await verificationCollection.orderBy('id_expirationDate', 'desc').get();
  const verifications = [];

  // Loop through each verification and get the customer details
  for (const verificationDoc of verificationsSnapshot.docs) {
    const verificationData = verificationDoc.data();
  

    if (verificationData.custId) {
      const customerDoc = await customerCollection.doc(verificationData.custId).get();
      const customerData = customerDoc.data();
      const verification = new Verification(verificationData, verificationDoc.id);
      if (customerData.verified === false) {
        verification.customerDetails = customerData;
        verifications.push(verification);
      }
    } else if (verificationData.itinId) {
      const itineraryDoc = await itinerantCollection.doc(verificationData.itinId).get();
      const itineraryData = itineraryDoc.data();  
      const verification = new Verification(verificationData, verificationDoc.id);
      if (itineraryData.verified === false) {
        verification.customerDetails = itineraryData;
        verifications.push(verification);
      }
    }
   
  }

  console.log(verifications)
  res.send({ success: true, data: { verifications } });
};


exports.verifyCustomer = async (req, res) => {
  jwt.verify(req.body.accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {

    // If JWT contains an admin ID
    var decodedData = JSON.parse(decoded.admin_id);

    var bytes = C.AES.decrypt(decodedData.password, process.env.SECRET_KEY);
    var originalText = bytes.toString(C.enc.Utf8);
   
    try {
      
      if(req.body.custId){
        const customerUser = await customerCollection.doc(req.body.custId).get();
        if (!customerUser.empty && originalText === req.body.password) {
          const user = customerUser;
          const userType = "Customer";
          const uid = user.id;
          const userRef = customerCollection.doc(uid);
          await userRef.update({ verified: true });
          res.send({ success: true, message: `Successfully verify ${userType}.` });
        }else {
          res.send({ success: false, message: "Invalid email or password", data: null });
        }
      }else if(req.body.itinId){
          const itinerantUser = await itinerantCollection.doc(req.body.itinId).get();
          if (!itinerantUser.empty && originalText === req.body.password) {
            const user = itinerantUser;
            const userType = "Itinerant";
            const uid = user.id;
            const userRef = itinerantCollection.doc(uid);
            await userRef.update({ verified: true });
            res.send({ success: true, message: `Successfully verify ${userType}.` });
          }else {
            res.send({ success: false, message: "Invalid email or password", data: null });
          }
           
      }
   
    } catch (error) {
      console.log(error);
      res.send({ success: false, message: "An error occured.", data: null });
    }
  })
}