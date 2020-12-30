const mongoose = require("mongoose");

const studSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },

  questions: {
    Easy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "easy",
      },
    ],
    Medium: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "medium", // no need to import
      },
    ],
    Difficult: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "difficult",
      },
    ],
  },

  mockTest: {
    totalQuestions: {
      type: Number,
      default: 0,
    },
    attempted: {
      type: Number,
      default: 0,
    },
    levelArray: [
      {
        type: Number,
        default: 0,
      },
    ],
    easyArray: [
      {
        type: Number,
      },
    ],
    mediumArray: [
      {
        type: Number,
      },
    ],
    difficultArray: [
      {
        type: Number,
      },
    ],
    timeLimit: [
      {
        type: Number,
      },
    ],
    marks: [
      {
        type: Number,
      },
    ],
    answer: [
      {
        type: Number,
      },
    ],
    sequence: [
      {
        type: String,
      },
    ],
  },
});

studSchema.methods.updateAnswer = async function (level, arg, questionNo) {
  if (level == "Easy") {
    arg = arg.Easy[questionNo].ans;
    // pushtoAnswer(,level);
  } else if (level == "Medium") {
    arg = arg.Medium[questionNo].ans;
    // pushtoAnswer(,level);
  } else if (level == "Difficult") {
    arg = arg.Difficult[questionNo].ans;
    // pushtoAnswer(,level);
  }

  this.mockTest.answer.push(arg);
  this.mockTest.answer.shift();
  this.mockTest.sequence.push(level);
  this.mockTest.sequence.shift();

  await this.save();
};

const studModel = mongoose.model("studentList", studSchema);

module.exports = studModel;
