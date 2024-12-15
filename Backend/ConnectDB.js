const mongoose = require("mongoose");
require("dotenv").config();

const CONNECT_DB = () =>{
    console.log(process.env.CONNECTION_STRING)
    return mongoose.connect(process.env.CONNECTION_STRING)
}

module.exports = CONNECT_DB