const User = require("../models/users");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const isUser = await User.findOne({ email: req.body.email });
    if (isUser) {
      return res.status(401).json({
        success: false,
        message: "Email Already exists.Please Log in.",
      });
    }
    const userData = await User.create(req.body);
    res.status(200).json({
      success: true,
      message: "Registered Successfully",
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
exports.login = async (req, res) => {
  try {
    const userData = await User.findOne({ email: req.body.email });
    if (!userData) {
      return res.status(200).json({
        success: false,
        message: "Email doesnt exists",
      });
    }
    if (userData.password === req.body.password) {
      const token = jwt.sign({ email: userData.email }, "SECRETKEY123");
      return res.status(200).json({
        success: true,
        message: "Login Successfull",
        userData,
        token,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password Incorrect",
      });
    }
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
