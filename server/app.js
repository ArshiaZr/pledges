const express = require("express");
const app = express();
const cors = require("cors");
require("express-async-errors");
const mongoose = require("mongoose");
const middleware = require("./utils/middleware");
const pledgeControllers = require("./controllers/pledge");

mongoose.connect(process.env.MONGODB_URI);

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

app.use("/pledge", pledgeControllers);

app.use(middleware.unkownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
