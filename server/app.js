const express = require("express");
const app = express();
const cors = require("cors");
require("express-async-errors");
const mongoose = require("mongoose");
const middleware = require("./utils/middleware");
const pledgeRouter = require("./routes/pledge");
const userRouter = require("./routes/user");
require("dotenv").config();
const stripePayment = require("./utils/stripePayment");

const db_url = process.env.MONGODB_URI;
mongoose.connect(db_url);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

// Enable CORS for the specified origin
const allowedOrigins = [
  'http://localhost:3000/'  // For development purposes
];

const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("dist"));

app.post("/create-payment-intent", stripePayment);

app.use("/pledge", pledgeRouter);
app.use("/user", userRouter);

app.use(middleware.unkownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
