const mongoose = require("mongoose");
const userDb = require("../Models/UserLogin");
const studDb = require("../Models/studFormat");

let testCriteria = async (id) => {
  var user = await userDb.findById(id, "questions testFormat mockTest");
  if (user == null) {
    user = await studDb.findById(id, "questions testFormat mockTest");
  }

  questionTypeArray = user.mockTest.levelArray;
  easyArray = user.mockTest.easyArray;
  mediumArray = user.mockTest.mediumArray;
  difficultArray = user.mockTest.difficultArray;

  var level = setDifficultyLevel(questionTypeArray);
  user.mockTest.levelArray.set(level, (questionTypeArray[level] -= 1));
  const timeLimit = user.mockTest.timeLimit[level];
  const marks = user.mockTest.marks[level];
  // 0 -> Easy
  // 1 -> Medium
  // 2 -> Difficult
  let questionNo;
  if (level == 0) {
    level = "Easy";
    questionNo = checkAvailability(easyArray);
    user.mockTest.easyArray.set(questionNo, (easyArray[questionNo] += 1));
  } else if (level == 1) {
    level = "Medium";
    questionNo = checkAvailability(mediumArray);
    user.mockTest.mediumArray.set(questionNo, (mediumArray[questionNo] += 1));
  } else if (level == 2) {
    level = "Difficult";
    questionNo = checkAvailability(difficultArray);
    user.mockTest.difficultArray.set(
      questionNo,
      (difficultArray[questionNo] += 1)
    );
  }

  user.save();

  return {
    level,
    questionNo,
    marks,
    timeLimit,
  };
};
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setDifficultyLevel(array) {
  let rand;

  do {
    rand = getRandomInt(0, 2);
  } while (!array[rand]);

  return rand;
}
function checkAvailability(array) {
  let rand;
  do {
    rand = getRandomInt(0, array.length - 1);
  } while (array[rand]);

  return rand;
}
module.exports = testCriteria;
