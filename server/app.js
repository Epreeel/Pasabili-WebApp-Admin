require('dotenv').config();
const express=require('express');
var cors = require('cors')
var bodyParser = require('body-parser');

const app=express();
app.use(express());
app.use(cors())
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.use(express.json());


const adminRoutes = require("./routes/adminRoutes");


app.use("/admin", adminRoutes);


app.listen(8000,()=> console.log("Back end is running at port 8000"));