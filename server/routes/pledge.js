const express = require("express");
const pledgeRouter = express.Router();
const pledgeControllers = require("../controllers/pledge");

pledgeRouter.post("/", pledgeControllers.createPledge);
pledgeRouter.get("/", pledgeControllers.getPledges);
pledgeRouter.put("/", pledgeControllers.editPledge);
pledgeRouter.delete("/", pledgeControllers.deletePledge);

module.exports = pledgeRouter;
