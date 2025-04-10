const express = require("express");
const { login,  signUp } = require("../controller/Auth")

const authRouter = express.Router();

authRouter.post("/sign-up", signUp);
authRouter.post("/login", login);

module.exports = authRouter

