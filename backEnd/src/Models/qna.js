const mongoose = require("mongoose");

const schema = mongoose.Schema({
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
        type: String,
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
  year: {
    type: String,
  },
  branch: {
    type: String,
  },
  startTime: {
    type: String,
  },
  date: {
    type: String,
  },
  subject: {
    type: String,
  },
  url: {
    type: String,
  },
  videoLink: {
    type: String,
  },
});

const model = mongoose.model("qnatemplate", schema);
module.exports = model;
