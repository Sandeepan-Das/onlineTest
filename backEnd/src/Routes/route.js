const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const base_64 = require("base-64");
const url = require("url");

const router = express.Router();

const verifyStud = require("../middlewares/verifyStudent");
const auth = require("../middlewares/auth");

//Requiring the questionBank Model
const questionBankModel = require("../Models/QuestionBank");
const qnaObj = require("../middlewares/qnaObj");
const qnamodel = require("../Models/qna");
//Requiring the user model
const userLoginModel = require("../Models/UserLogin");
const questionToSend = require("../testData/generatingTest");
const totalMarks = require("../testData/checkAnswer");
const studModel = require("../Models/studFormat");

router.get("/me", auth, async (req, res) => {
  res.send(req.user);
});

//Adding a new question in db
router.post("/questionBank", auth, async (req, res) => {
  let level;

  let user = req.user;
  console.log(req.body);
  req.body.teacherId = req.user._id;
  req.body.teacherName = req.user.name;
  if (req.body.difficultyLevel == "Easy") {
    // console.log("A");
    level = new questionBankModel.easy(req.body);
  } else if (req.body.difficultyLevel == "Medium") {
    level = new questionBankModel.medium(req.body);
  } else if (req.body.difficultyLevel == "Difficult") {
    level = new questionBankModel.difficult(req.body);
  }
  try {
    level = await level.save();
    // Adddig the id of question to users array

    // const add = await user.addQuestiontouser(level._id, level.difficultyLevel);

    res.send({ level });
  } catch (error) {
    res.status(404).send(`Cannot be added ${error}`);
  }
});

router.post("/addToUser", auth, async (req, res) => {
  let user = req.user;
  console.log(req.body);
  const add = await user.addQuestiontouser(req.body.arr, req.body.level);
});
router.post("/delFromUser", auth, async (req, res) => {
  let difficultyLevel = req.body.level;
  let user = req.user;
  let array1;
  if (difficultyLevel == "Easy") {
    user.questions.Easy = user.questions.Easy.filter(
      (val) => !req.body.arr.includes(val.toString())
    );
  } else if (difficultyLevel == "Medium") {
    user.questions.Medium = user.questions.Medium.filter(
      (val) => !req.body.arr.includes(val.toString())
    );
  } else if (difficultyLevel == "Difficult") {
    user.questions.Difficult = user.questions.Difficult.filter(
      (val) => !req.body.arr.includes(val.toString())
    );
  }

  await user.save();
  res.send({});
});
//Creating a new user
router.post("/users", async (req, res) => {
  req.body.unique = base_64.encode(req.body.email); //Unique identification for the teacher
  if (req.body.role == "student") {
    userLogin = new userLoginModel.studentModel(req.body);
  } else {
    userLogin = new userLoginModel.teacherModel(req.body);
  }
  try {
    const data = await userLogin.save();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Login with already registered user
router.post("/users/login", async (req, res) => {
  let user;
  let checkEmail;
  console.log(req.body);
  try {
    if (req.body.role == "student") {
      checkEmail = await userLoginModel.studentModel.findOne({
        email: req.body.email,
      });

      user = await userLoginModel.studentModel.findbyCredentials(
        checkEmail.email,
        req.body.password,
        checkEmail.password
      );
    } else {
      checkEmail = await userLoginModel.teacherModel.findOne({
        email: req.body.email,
      });
      user = await userLoginModel.teacherModel.findbyCredentials(
        checkEmail.email,
        req.body.password,
        checkEmail.password
      );
    }

    const token = await checkEmail.generateauthtoken();
    res.send({ token });
  } catch (error) {
    res.status(405).send(error);
  }
});

// To display  questions for exam
router.get("/test/getquestion/:difficultyLevel", auth, async (req, res) => {
  //What to reference inside userLogin in populate field
  let difficultyLevel = req.params.difficultyLevel;

  await req.user
    .populate(`questions.${difficultyLevel}`)
    .execPopulate((err, data) => {
      if (difficultyLevel == "Easy") {
        res.send(data.questions.Easy);
      } else if (difficultyLevel == "Medium") {
        res.send(data.questions.Medium);
      } else if (difficultyLevel == "Difficult") {
        res.send(data.questions.Difficult);
      }
    });
});
// To display user bank questions
router.get(
  "/test/getMyBank/:year/:branch/:subject/:difficultyLevel",
  auth,
  async (req, res) => {
    let difficultyLevel = req.params.difficultyLevel;
    let year = req.params.year;
    let branch = req.params.branch;
    let subject = req.params.subject;

    if (difficultyLevel == "Easy") {
      const data = questionBankModel.easy.find(
        {
          teacherId: mongoose.Types.ObjectId(req.user._id),
          year,
          branch,
          subject,
        },
        (err, result) => {
          res.send(result);
        }
      );
    } else if (difficultyLevel == "Medium") {
      const data = questionBankModel.medium.find(
        {
          teacherId: mongoose.Types.ObjectId(req.user._id),
          year,
          branch,
          subject,
        },
        (err, result) => {
          res.send(result);
        }
      );
    } else if (difficultyLevel == "Difficult") {
      const data = questionBankModel.difficult.find(
        {
          teacherId: mongoose.Types.ObjectId(req.user._id),
          year,
          branch,
          subject,
        },
        (err, result) => {
          res.send(result);
        }
      );
    }
  }
);
// To display all questions
router.get(
  "/test/getallquestion/:year/:subject/:difficultyLevel",
  auth,
  async (req, res) => {
    let difficultyLevel = req.params.difficultyLevel;
    let year = req.params.year;
    let subject = req.params.subject;
    if (difficultyLevel == "Easy") {
      const data = questionBankModel.easy.find(
        {
          teacherId: { $ne: mongoose.Types.ObjectId(req.user._id) },
          year,
          subject,
        },
        (err, result) => {
          res.send(result);
        }
      );
    } else if (difficultyLevel == "Medium") {
      const data = questionBankModel.medium.find(
        {
          teacherId: { $ne: mongoose.Types.ObjectId(req.user._id) },
          year,
          subject,
        },
        (err, result) => {
          res.send(result);
        }
      );
    } else if (difficultyLevel == "Difficult") {
      const data = questionBankModel.difficult.find(
        {
          teacherId: { $ne: mongoose.Types.ObjectId(req.user._id) },
          year,
          subject,
        },
        (err, result) => {
          res.send(result);
        }
      );
    }
  }
);

//Route to pass test parameter  // may be remove no . of questions criteria
router.post("/createTest", auth, async (req, res) => {
  const user = req.user;
  qnaObj(req.body, user);
  res.send({});
});

//Route for teacher to appear mock test
router.get("/mockTest/testParameter", auth, async (req, res) => {
  user = req.user;
  var data;
  var difficultyLevel;
  if (user.mockTest.attempted != user.mockTest.totalQuestions) {
    user.mockTest.attempted += 1;
    await user.save();
    await questionToSend(user._id).then((arg) => {
      data = arg;

      difficultyLevel = data.level;
      marks = data.marks;
      timeLimit = data.timeLimit;
      console.log(arg);
    });
    await user
      .populate(`questions.${difficultyLevel}`)
      .execPopulate(async (err, arg) => {
        await user.updateAnswer(
          difficultyLevel,
          arg.questions,
          data.questionNo
        );
        if (difficultyLevel == "Easy") {
          res.send({
            questionDetails: arg.questions.Easy[data.questionNo],
            difficultyLevel,
            marks,
            timeLimit,
          });
        } else if (difficultyLevel == "Medium") {
          res.send({
            questionDetails: arg.questions.Medium[data.questionNo],
            difficultyLevel,
            marks,
            timeLimit,
          });
        } else if (difficultyLevel == "Difficult") {
          res.send({
            questionDetails: arg.questions.Difficult[data.questionNo],
            difficultyLevel,
            marks,
            timeLimit,
          });
        }
      });
  } else {
    res.sendStatus(400);
  }
});

//Route to display result for mockTest
router.post("/mockTest/ans", auth, async (req, res) => {
  const user = req.user;

  let marks = totalMarks(
    user.mockTest.answer,
    req.body,
    user.mockTest.marks,
    user.mockTest.sequence
  );

  res.send({ marks });
});

router.post("/userTest/ans", verifyStud, async (req, res) => {
  const user = await studModel.findOne({ email: req.studEmail });

  let marks = totalMarks(
    user.mockTest.answer,
    req.body,
    user.mockTest.marks,
    user.mockTest.sequence
  );

  res.send({ marks });
});

//Route to appear test by student
router.get("/Finaltest", verifyStud, async (req, res) => {
  const teacher = req.teacher;
  let user = await studModel.findOne({ email: req.studEmail });
  var data;
  var difficultyLevel;
  if (user.mockTest.attempted != user.mockTest.totalQuestions) {
    user.mockTest.attempted += 1;
    await user.save();
    await questionToSend(user._id).then((arg) => {
      data = arg;

      difficultyLevel = data.level;
      marks = data.marks;
      timeLimit = data.timeLimit;
    });

    await user
      .populate(`questions.${difficultyLevel}`)
      .execPopulate(async (err, arg) => {
        await user.updateAnswer(
          difficultyLevel,
          arg.questions,
          data.questionNo
        );
        if (difficultyLevel == "Easy") {
          res.send({
            questionDetails: arg.questions.Easy[data.questionNo],
            difficultyLevel,
            marks,
            timeLimit,
          });
        } else if (difficultyLevel == "Medium") {
          res.send({
            questionDetails: arg.questions.Medium[data.questionNo],
            difficultyLevel,
            marks,
            timeLimit,
          });
        } else if (difficultyLevel == "Difficult") {
          res.send({
            questionDetails: arg.questions.Difficult[data.questionNo],
            difficultyLevel,
            marks,
            timeLimit,
          });
        }
      });
  } else {
    res.sendStatus(400);
  }
});

//Route to initialize account
router.post("/attemptTest", verifyStud, async (req, res) => {
  let user = await studModel.findOne({ email: req.studEmail });
  const question = await qnamodel({ year: user.year, branch: user.branch });
  user.questions = question.questions;

  user.mockTest = question.mockTest;

  await user.save();
});

//Adding Student Email ID
router.get("/AddStudList/:studEmail", auth, async (req, res) => {
  const user = req.user;
  user.studList.push(req.params.studEmail);
  user.save();
  res.sendStatus(200);
});

module.exports = router;
