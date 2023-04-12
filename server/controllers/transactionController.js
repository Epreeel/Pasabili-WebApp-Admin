
const Customer = require("../models/customer");
const Itinerant = require("../models/itinerant");
const Transaction = require("../models/transaction");
var C = require("crypto-js");
const jwt = require('jsonwebtoken');
const admin = require('firebase-admin');
const db = admin.firestore();

const customerCollection = db.collection('Users');
const itinerantCollection = db.collection('Itinerants');
const transactionCollection = db.collection('Transactions');

exports.getAllTransactions = async (req, res) => {
        // Get all transactions 
        const transactionsSnapshot = await transactionCollection
        .orderBy('createdAt', 'desc')
        .get();
    const transactionsPromises = transactionsSnapshot.docs.map(async (doc) => {
        const data = doc.data();
        const customerRef = customerCollection.doc(data.customer_id.id);
        const itinerantRef = itinerantCollection.doc(data.itinerant_id.id);
        const [customerDoc, itinerantDoc] = await Promise.all([customerRef.get(), itinerantRef.get()]);
     
        const transaction = new Transaction({
            ...data,
            customer_id: customerDoc.data(),
            itinerant_id: itinerantDoc.data(),
        }, doc.id);
      
        return transaction;
    });
    
    const transactions = await Promise.all(transactionsPromises);

    // Return the results
    res.send({ success: true, data: transactions  });
};
