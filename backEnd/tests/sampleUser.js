const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");


//Generating object ID
const id = new mongoose.Types.ObjectId

//Generating token
const token = jwt.sign({ _id: id }, "sandy")



//Generating a sample user
const user = {
    _id: id,
    name: "Sandeepan",
    email: "sandy",
    password: "San12!qw",
    tokens: [{
        token: token
    }]
}

module.exports = user;