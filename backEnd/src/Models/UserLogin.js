const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// const questionModel = require("./QuestionBank")

const userSchema = mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  unique: {
    type: String,
  },
  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],

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
  studList: [
    {
      type: String,
    },
  ],
});
// console.log("A",questionModel.medium);
// userSchema.virtual("questions",{
//     ref:"questionModel.medium",
//     localField:"_id",
//     foreignField:"teacher"
// })

//Generating authentication token
userSchema.methods.generateauthtoken = async function () {
  const token = jwt.sign({ _id: this._id }, "sandy");
  this.tokens.push({ token: token });
  await this.save();
  // console.log(token)
  return token;
};
//fuction added to instance of a userschema to add questions
userSchema.methods.addQuestiontouser = async function (arr, difficultyLevel) {
  arr.forEach((element) => {
    if (difficultyLevel == "Easy") {
      this.questions.Easy.push(mongoose.Types.ObjectId(element));
    } else if (difficultyLevel == "Medium") {
      this.questions.Medium.push(mongoose.Types.ObjectId(element));
    } else if (difficultyLevel == "Difficult") {
      this.questions.Difficult.push(mongoose.Types.ObjectId(element));
    }
  });

  await this.save();
  return this.questions;
};

//Verifying registered user
userSchema.statics.findbyCredentials = async (email, password) => {
  const checkEmail = await userModel.findOne({ email });

  if (!checkEmail) {
    throw new Error("Wrong Email");
  }

  //comparing the string password and hashed password
  const checkPassword = await bcrypt.compare(password, checkEmail.password);
  if (!checkPassword) {
    throw new Error("Wrong Email or password");
  }
  return checkEmail;
};

//using a middleware to hash the password
userSchema.pre("save", async function (next) {
  if (this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 8);
  next();
});

userSchema.methods.addCriteria = async function (params) {
  this.mockTest.totalQuestions = Number(params.totalQuestions);

  this.mockTest.levelArray = [
    Number(params.eachType.Easy),
    Number(params.eachType.Medium),
    Number(params.eachType.Difficult),
  ];
  this.mockTest.easyArray = new Array(Number(this.questions.Easy.length)).fill(
    0
  );
  this.mockTest.mediumArray = new Array(
    Number(this.questions.Medium.length) + 1
  )
    .join("0")
    .split("")
    .map(parseFloat);
  this.mockTest.difficultArray = new Array(
    Number(this.questions.Difficult.length)
  ).fill(0);

  this.mockTest.timeLimit = [
    params.timeLimit.Easy,
    params.timeLimit.Medium,
    params.timeLimit.Difficult,
  ];
  this.mockTest.marks = [
    params.marks.Easy,
    params.marks.Medium,
    params.marks.Difficult,
  ];

  this.mockTest.attempted = 0;

  this.mockTest.answer = new Array(Number(params.totalQuestions)).fill(-1);
  this.mockTest.sequence = new Array(Number(params.totalQuestions)).fill(" ");
  await this.save();
};

userSchema.methods.updateAnswer = async function (level, arg, questionNo) {
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

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
