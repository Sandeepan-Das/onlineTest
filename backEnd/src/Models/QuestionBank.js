const mongoose = require("mongoose");
const userModel = require("./UserLogin")

const questionBankSchema = mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    OptA:{
        type:String
    },
    OptB:{
        type:String
    },
    OptC:{
        type:String
    },
    OptD:{
        type:String
    },
    ans:{
        type:Number,
        required:true
    },
    difficultyLevel:{
        type:String,
        required:true
    },
    // teacher:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     required:true,
    //     ref:"userModel"
    // }
});

const easy = mongoose.model("easy",questionBankSchema);
const medium = mongoose.model("medium",questionBankSchema);
const difficult = mongoose.model("difficult",questionBankSchema);

module.exports ={
    easy:easy,
    medium:medium,
    difficult:difficult

};