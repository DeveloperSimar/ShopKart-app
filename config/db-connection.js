const mongoose = require("mongoose");
const dbglr = require('debug')('development:mongoose');
const config = require('config');
const env = require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI).then(function(){
    dbglr("connected to database")
}).catch((err)=>{
    dbglr(err);
});

module.exports = mongoose.connection;