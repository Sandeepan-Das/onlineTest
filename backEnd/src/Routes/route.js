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
  // req.body.teacher = req.user._id;
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
    const add = await user.addQuestiontouser(level._id, level.difficultyLevel);

    res.send({ level });
  } catch (error) {
    res.status(404).send(`Cannot be added ${error}`);
  }
});

//Creating a new user
router.post("/users", async (req, res) => {
  req.body.unique = base_64.encode(req.body.email);
  userLogin = new userLoginModel(req.body);
  try {
    const data = await userLogin.save();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Login with already registered user
router.post("/users/login", async (req, res) => {
  // console.log(req.body)
  try {
    const user = await userLoginModel.findbyCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateauthtoken();
    res.send({ token });
  } catch (error) {
    res.status(400).send(error);
  }
});

// To display questions
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

//Route to pass test parameter
router.post("/createTest", auth, async (req, res) => {
  const user = req.user;

  await user.addCriteria(req.body, user);
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

//Route to display result
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

//Route to appear test
router.get("/test/", verifyStud, async (req, res) => {
  const teacher = req.teacher;
  const user = await studModel.findOne({ email: req.studEmail });
  if (user == undefined) {
     user = new studModel({ email: req.studEmail });
    await user.save();
  }

  user.questions = teacher.questions;

  user.mockTest = teacher.mockTest;
  user.save();

  res.render("./frontEnd/src/test/test.component.html")
  var data;
  var difficultyLevel;
  // if (user.mockTest.attempted != user.mockTest.totalQuestions) {
  //     user.mockTest.attempted += 1;
  //     await user.save()
  //     await questionToSend(user._id).then((arg) => {
  //         data = arg;

  //         difficultyLevel = data.level;
  //         marks = data.marks;
  //         timeLimit = data.timeLimit
  //     })
  //     await user.populate(`questions.${difficultyLevel}`).execPopulate(async (err, arg) => {
  //         await user.updateAnswer(difficultyLevel, arg.questions, data.questionNo)
  //         if (difficultyLevel == "Easy") {

  //             res.send({
  //                 questionDetails: arg.questions.Easy[data.questionNo],
  //                 difficultyLevel, marks,
  //                 timeLimit
  //             })

  //         }
  //         else if (difficultyLevel == "Medium") {

  //             res.send({
  //                 questionDetails: arg.questions.Medium[data.questionNo],
  //                 difficultyLevel, marks,
  //                 timeLimit
  //             })

  //         }
  //         else if (difficultyLevel == "Difficult") {

  //             res.send({
  //                 questionDetails: arg.questions.Difficult[data.questionNo],
  //                 difficultyLevel,
  //                 marks,
  //                 timeLimit
  //             })

  //         }
  //     })
  // }
  // else {
  //     res.sendStatus(400)

  // }
});

//Adding Student Email ID
router.get("/AddStudList/:studEmail", auth, async (req, res) => {
  const user = req.user;
  user.studList.push(req.params.studEmail);
  user.save();
  res.sendStatus(200);
});

module.exports = router;
