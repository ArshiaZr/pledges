const express = require("express");
const app = express();
const cors = require("cors");
require("express-async-errors");
const mongoose = require("mongoose");
const middleware = require("./utils/middleware");
const pledgeRouter = require("./routes/pledge");

const db_url = process.env.MONGODB_URI
mongoose.connect("mongodb+srv://pledgeuser:W0v4e2Q5IgyE8zwP@pledges-cluster.baj3pce.mongodb.net/?retryWrites=true&w=majority");
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
