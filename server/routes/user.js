const express = require("express");
const userRouter = express.Router();
const userControllers = require("../controllers/user");

const path = require("path");

// authentication middleware
const authMiddleware = require(path.join(__dirname, "../utils/auth.js"));

userRouter.post("/register", userControllers.registerUser);
userRouter.post("/login", userControllers.loginUser);
userRouter.get("/balance", authMiddleware, userControllers.getBalance);

module.exports = userRouter;
