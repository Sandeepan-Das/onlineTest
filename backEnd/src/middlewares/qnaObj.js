const mongoose = require("mongoose");
const model = require("../Models/qna");
const qnaModel = {
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
  year: {
    type: String,
  },
  branch: {
    type: String,
  },
  startTime: {
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
};
async function saveQna(params, user) {
  console.log(params);
  qnaModel.questions.Easy = user.questions.Easy;
  qnaModel.questions.Medium = user.questions.Medium;
  qnaModel.questions.Difficult = user.questions.Difficult;
  qnaModel.mockTest.totalQuestions = Number(params.totalQuestions);
  qnaModel.year = params.studRequirement.year;
  qnaModel.branch = params.studRequirement.branch;
  qnaModel.subject = params.studRequirement.subject;
  qnaModel.startTime = Number(params.studRequirement.startTime);
  qnaModel.mockTest.levelArray = [
    Number(params.eachType.Easy),
    Number(params.eachType.Medium),
    Number(params.eachType.Difficult),
  ];
  qnaModel.mockTest.easyArray = new Array(Number(params.eachType.Easy)).fill(0);
  qnaModel.mockTest.mediumArray = new Array(
    Number(params.eachType.Medium)
  ).fill(0);
  qnaModel.mockTest.difficultArray = new Array(
    Number(params.eachType.Difficult)
  ).fill(0);

  qnaModel.mockTest.timeLimit = [
    params.timeLimit.Easy,
    params.timeLimit.Medium,
    params.timeLimit.Difficult,
  ];
  qnaModel.mockTest.marks = [
    params.marks.Easy,
    params.marks.Medium,
    params.marks.Difficult,
  ];

  qnaModel.mockTest.attempted = 0;

  qnaModel.mockTest.answer = new Array(Number(params.totalQuestions)).fill(-1);
  qnaModel.mockTest.sequence = new Array(Number(params.totalQuestions)).fill(
    " "
  );
  qnaModel.url = `http://localhost:4200/test/${user.unique}`
  qnaModel.videoLink = user.unique;
  const template = new model(qnaModel);
  template.save();
}
module.exports = saveQna;
