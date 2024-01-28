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
  location: {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
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

PledgeSchema.index({ location: "2dsphere" });

const Pledge = model("Pledge", PledgeSchema);
module.exports = Pledge;
