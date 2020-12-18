const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose')


const app = express();


//Requiring the route
const route = require("./src/Routes/route")

//MIDDLEWARES
app.use(cors()) 
app.use(express.json());
app.use("/api",route);

//MONGODB CONNECTION
mongoose.connect("mongodb://127.0.0.1/onlineTest",{useNewUrlParser:true,useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Db connected")
});

module.exports = app;