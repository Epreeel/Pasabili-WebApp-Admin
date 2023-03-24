
const Admin = require("../models/admin");
const Itinerant = require("../models/itinerant");
var C = require("crypto-js");
const jwt = require('jsonwebtoken');
const admin = require('firebase-admin');
const db = admin.firestore();
const auth = admin.auth();

const adminCollection = db.collection('Admins');
const itinerantCollection = db.collection('Itinerants');
exports.getAllAdminAndItinerant = async (req, res) => {
    // Get all active admins with their addresses
    const adminsSnapshot = await adminCollection
        .where('status', '==', true)
        .orderBy('createdAt', 'desc')
        .get();
    const admins = [];
    adminsSnapshot.forEach((doc) => {
        const admin = new Admin(doc.data(), doc.id);
        admins.push(admin);
    });


    // Get all active itinerants with their addresses
    const itinerantsSnapshot = await itinerantCollection
        .where('status', '==', true)
        .orderBy('createdAt', 'desc')
        .get();
    const itinerants = [];
    itinerantsSnapshot.forEach((doc) => {
        const itinerant = new Itinerant(doc.data(), doc.id);
        itinerants.push(itinerant);
    });

    // Get all inactive itinerants with their addresses
    const inactiveItinerantsSnapshot = await itinerantCollection
        .where('status', '==', false)
        .orderBy('createdAt', 'desc')
        .get();
    const inactiveItinerants = [];
    inactiveItinerantsSnapshot.forEach((doc) => {
        const itinerant = new Itinerant(doc.data(), doc.id);
        inactiveItinerants.push(itinerant);
    });

    // Get all inactive admins with their addresses
    const inactiveAdminsSnapshot = await adminCollection
        .where('status', '==', false)
        .orderBy('createdAt', 'desc')
        .get();
    const inactiveAdmins = [];
    inactiveAdminsSnapshot.forEach((doc) => {
        const admin = new Admin(doc.data(), doc.id);
        inactiveAdmins.push(admin);
    });

    // Combine inactive itinerants and inactive admins into one array
    const inactives = [...inactiveItinerants, ...inactiveAdmins];



    // Return the results
    res.send({ success: true, data: { admins, itinerants, inactives } });
};


exports.deactivateEmployee = async (req, res) => {
    jwt.verify(req.body.accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {

        // If JWT contains an admin ID
        var decodedData = JSON.parse(decoded.admin_id);
       
        var bytes = C.AES.decrypt(decodedData.password, process.env.SECRET_KEY);
        var originalText = bytes.toString(C.enc.Utf8);

        try {
            const adminUser = await adminCollection.where('email', '==', req.body.email).get();
            const itinerantUser = await itinerantCollection.where('email', '==', req.body.email).get();

            if (!adminUser.empty && originalText === req.body.password) {
                const user = adminUser.docs[0];
                const userType = "Admin";
                const uid = user.id;
                const userRef = adminCollection.doc(uid);
                await userRef.update({ status: false });
                res.send({ success: true, message: `Successfully deactivated ${userType}.` });
            } else if (!itinerantUser.empty && originalText === req.body.password) {
                const user = itinerantUser.docs[0];
                const userType = "Itinerant";
                const uid = user.id;
                const userRef = itinerantCollection.doc(uid);
                await userRef.update({ status: false });
                res.send({ success: true, message: `Successfully deactivated ${userType}.` });
            } else {
                res.send({ success: false, message: "Invalid email or password", data: null });
            }
        } catch (error) {
            console.log(error);
            res.send({ success: false, message: "Invalid email or password", data: null });
        }
    })
}


exports.reactivateEmployee = async (req, res) => {
    jwt.verify(req.body.accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {

        // If JWT contains an admin ID
        var decodedData = JSON.parse(decoded.admin_id);
       
        var bytes = C.AES.decrypt(decodedData.password, process.env.SECRET_KEY);
        var originalText = bytes.toString(C.enc.Utf8);

        try {
            const adminUser = await adminCollection.where('email', '==', req.body.email).get();
            const itinerantUser = await itinerantCollection.where('email', '==', req.body.email).get();

            if (!adminUser.empty && originalText === req.body.password) {
                const user = adminUser.docs[0];
                const userType = "Admin";
                const uid = user.id;
                const userRef = adminCollection.doc(uid);
                await userRef.update({ status: true });
                res.send({ success: true, message: `Successfully reactivated ${userType}.` });
            } else if (!itinerantUser.empty && originalText === req.body.password) {
                const user = itinerantUser.docs[0];
                const userType = "Itinerant";
                const uid = user.id;
                const userRef = itinerantCollection.doc(uid);
                await userRef.update({ status: true });
                res.send({ success: true, message: `Successfully reactivated ${userType}.` });
            } else {
                res.send({ success: false, message: "Invalid email or password", data: null });
            }
        } catch (error) {
            console.log(error);
            res.send({ success: false, message: "Invalid email or password", data: null });
        }
    })
}

exports.registerAdmin = async (req, res) => {
    console.log(req.body);
    const snapshot = await adminCollection.where('email', '==', req.body.email).get();

    if (snapshot.empty) {
        req.body.password = 'p@ssw0rd';
        const hash = C.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();
        req.body.password = hash;
        req.body.status = true;
        req.body.verified = false;
        const birthdate = new Date(req.body.birthday);
        const timestamp = admin.firestore.Timestamp.fromDate(birthdate);
        const gender = req.body.gender === "Male" ? 1 : 2;
      
        const adminData = {
            email: req.body.email,
            password: req.body.password,
            fname: req.body.firstname,
            lname: req.body.lastname,
            address: req.body.address,
            status: req.body.status,
            verified: req.body.verified,
            contact_no: req.body.contact_no,
            gender: gender,
            birthday: timestamp,
            createdAt : admin.firestore.Timestamp.now()
        };
        await auth.createUser({
            email: req.body.email,
            password: req.body.password,
        });
        await adminCollection.add(adminData);

        res.send({ success: true, message: 'Successfully registered!' });
    } else {
        res.send({ success: false, message: 'Account already exists!' });
    }
};



// exports.registerAdmin = async (req, res) => {
//     let data = await admin.model.findAll({
//         where: {
//             email: req.body.email
//         }
//     })

//     if (data.length === 0) {
//         req.body.password = "p@ssw0rd";
//         var hash = C.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();
//         req.body.password = hash;
//         let admin_address = await address.model.create({
//             street: req.body.street,
//             barangay: req.body.barangay,
//             town: req.body.town,
//             postal_code: req.body.postal_code
//         });
       
//         await admin.model.create({
//             address_id: admin_address.address_id,
//             email: req.body.email,
//             fname: req.body.fname,
//             lname: req.body.lname,
//             password: req.body.password,
//             contact_no: req.body.contact,
//             status: req.body.status
//         });
//         res.send({ success: true, message: "Successfully Register!" });
//     } else {
//         res.send({ success: false, message: "Account already exist!" });
//     }

// }