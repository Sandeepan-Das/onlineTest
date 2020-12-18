const mongoose = require("mongoose")

const questionSample = {
    _id:new mongoose.Types.ObjectId,
    question:"Who is the world's richest person",
    OptA:"Jeff",
    OptB:"Ambani",
    OptC:"Bill",
    OptD:"Sandy",
    ans:"D",
    difficultyLevel:"Easy",
}

module.exports = questionSample;