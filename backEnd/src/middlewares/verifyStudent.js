const userModel = require("../Models/UserLogin");
const url = require("url");

const verifyStud = async (req, res, next) => {
  try {
    const queryObject = url.parse(req.url, true).query;

    const teacherCode = queryObject.tcode; //tcode,   scode
    const teacher = await userModel.findOne({ unique: teacherCode });

    req.teacher = teacher;
    req.studEmail = queryObject.scode;
    // teacher.studList.forEach(element => {
    //     if (req.body.email == element) next();
    // });
    next();
  } catch (error) {
    throw new Error("You are not invited");
  }
};

module.exports = verifyStud;
