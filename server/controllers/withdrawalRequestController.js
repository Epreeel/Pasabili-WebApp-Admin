
const WithdrawalRequest = require("../models/withdrawalRequest");
var C = require("crypto-js");
const jwt = require('jsonwebtoken');
const admin = require('firebase-admin');
const db = admin.firestore();

const withdrawCollection = db.collection('WithdrawalRequests');
const customerCollection = db.collection('Users');
const itinerantCollection = db.collection('Itinerants');
exports.getAllWithdrawalRequests = async (req, res) => {
  // get all pending withdraws
  const withdrawsSnapshot = await withdrawCollection
    .where('withdrawal_status', '==', 1)
    .orderBy('withdrawal_timestampSent', 'desc').get();
  const withdraws = [];

  // Loop through each withdraw and get the user details
  for (const withdrawDoc of withdrawsSnapshot.docs) {
    const withdrawData = withdrawDoc.data();

    if (withdrawData.withdrawal_itinid != null) {
      const itineraryDoc = await itinerantCollection.doc(withdrawData.withdrawal_itinid).get();
      if (itineraryDoc.exists) {
        const itineraryData = itineraryDoc.data();
        const withdraw = new WithdrawalRequest(withdrawData, withdrawDoc.id);
        withdraw.userDetails = itineraryData;
        withdraw.type = "Itinerant"
        withdraws.push(withdraw);
        continue;
      }
    } else if (withdrawData.withdrawal_userid != null) {
      const customerDoc = await customerCollection.doc(withdrawData.withdrawal_userid).get();
      if (customerDoc.exists) {
        const customerData = customerDoc.data();
        const withdraw = new WithdrawalRequest(withdrawData, withdrawDoc.id);
        withdraw.userDetails = customerData;
        withdraw.type = "Customer";
        withdraws.push(withdraw);
        continue;
      }
    }
  }

  // get all approved withdraws
  const approvedWithdrawsSnapshot = await withdrawCollection
    .where('withdrawal_status', '==', 2)
    .orderBy('withdrawal_timestampSent', 'desc').get();
  const approvedWithdraws = [];

  // Loop through each withdraw and get the user details
  for (const approvedWithdrawDoc of approvedWithdrawsSnapshot.docs) {
    const approvedWithdrawData = approvedWithdrawDoc.data();

    if (approvedWithdrawData.withdrawal_itinid != null) {
      const itineraryDoc = await itinerantCollection.doc(approvedWithdrawData.withdrawal_itinid).get();
      if (itineraryDoc.exists) {
        const itineraryData = itineraryDoc.data();
        const approvedWithdraw = new WithdrawalRequest(approvedWithdrawData, approvedWithdrawDoc.id);
        approvedWithdraw.userDetails = itineraryData;
        approvedWithdraw.type = "Itinerant"
        approvedWithdraws.push(approvedWithdraw);
        continue;
      }

    } else if (approvedWithdrawData.withdrawal_userid != null) {
      const customerDoc = await customerCollection.doc(approvedWithdrawData.withdrawal_userid).get();
      if (customerDoc.exists) {
        const customerData = customerDoc.data();
        const approvedWithdraw = new WithdrawalRequest(approvedWithdrawData, approvedWithdrawDoc.id);
        approvedWithdraw.userDetails = customerData;
        approvedWithdraw.type = "Customer";
        approvedWithdraws.push(approvedWithdraw);
        continue;
      }
    }


  }

  res.send({ success: true, data: { withdraws, approvedWithdraws } });
};

exports.approveWithdrawalRequest = async (req, res) => {
  jwt.verify(req.body.accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {

    // If JWT contains an admin ID
    var decodedData = JSON.parse(decoded.admin_id);

    var bytes = C.AES.decrypt(decodedData.password, process.env.SECRET_KEY);
    var originalText = bytes.toString(C.enc.Utf8);

    try {

      if (originalText === req.body.password) {
        const ref = withdrawCollection.doc(req.body.withdrawal_request_id);
        await ref.update({ withdrawal_status: 2 });
        res.send({ success: true, message: `Successfully approved.` });
      } else {
        res.send({ success: false, message: "Invalid password", data: null });
      }
    } catch (error) {
      console.log(error);
      res.send({ success: false, message: "Invalid password", data: null });
    }
  })
}


exports.discardWithdrawalRequest = async (req, res) => {
  jwt.verify(req.body.accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {

    // If JWT contains an admin ID
    var decodedData = JSON.parse(decoded.admin_id);

    var bytes = C.AES.decrypt(decodedData.password, process.env.SECRET_KEY);
    var originalText = bytes.toString(C.enc.Utf8);

    try {

      if (originalText === req.body.password) {
        const ref = withdrawCollection.doc(req.body.withdrawal_request_id);
        await ref.update({ withdrawal_status: 3 });
        res.send({ success: true, message: `Successfully discarded.` });
      } else {
        res.send({ success: false, message: "Invalid password", data: null });
      }
    } catch (error) {
      console.log(error);
      res.send({ success: false, message: "Invalid password", data: null });
    }
  })
}

