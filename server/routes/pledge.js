const express = require("express");
const pledgeRouter = express.Router();
const pledgeControllers = require("../controllers/pledge");

const path = require("path");

// authentication middleware
const authMiddleware = require(path.join(__dirname, "../utils/auth.js"));

pledgeRouter.post("/", authMiddleware, pledgeControllers.createPledge);
pledgeRouter.get("/", authMiddleware, pledgeControllers.getPledges);
pledgeRouter.put("/:id", authMiddleware, pledgeControllers.editPledge);
pledgeRouter.delete("/:id", authMiddleware, pledgeControllers.deletePledge);
pledgeRouter.post("/check", authMiddleware, pledgeControllers.checkPledges);

module.exports = pledgeRouter;
