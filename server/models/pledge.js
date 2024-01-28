const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const PledgeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: String,
  detail: String,
  amount: Number,
  dateDue: Date,
  dateCreated: {
    type: Date,
    default: new Date(),
  },
  dateUpdated: Date,
  location: String,
  repeat: String,
  link: String,
  priority: {
    type: Number,
    min: 0,
    max: 2,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  success: {
    type: Boolean,
    default: false,
  },
});

const Pledge = model("Pledge", PledgeSchema);
module.exports = Pledge;
