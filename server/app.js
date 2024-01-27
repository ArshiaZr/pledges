const express = require("express");
const app = express();
const cors = require("cors");
require("express-async-errors");
const mongoose = require("mongoose");
const middleware = require("./utils/middleware");
const pledgeRouter = require("./routes/pledge");
require('dotenv').config();

const db_url = process.env.MONGODB_URI
mongoose.connect(db_url);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

app.use("/pledge", pledgeRouter);

app.use(middleware.unkownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
