const express = require("express");
const userRouter = express.Router();
const userControllers = require("../controllers/pledge");

const path = require("path");

userRouter.post("/register", pledgeControllers.createPledge);
userRouter.get("/login", pledgeControllers.getPledges);

module.exports = userRouter;
