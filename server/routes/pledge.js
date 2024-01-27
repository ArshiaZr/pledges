const express = require("express");
const pledgeRouter = express.Router();
const pledgeControllers = require("../controllers/pledge");

pledgeRouter.post("/", pledgeControllers.createPledge);
pledgeRouter.get("/", pledgeControllers.getPledges);
pledgeRouter.put("/:id", pledgeControllers.editPledge);
pledgeRouter.delete("/:id", pledgeControllers.deletePledge);

module.exports = pledgeRouter;
