const express = require("express");
const { register, login } = require("../controllers/user");
const { validateRegister } = require("../middlewares/validationRegister");

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", login);
module.exports = router;
