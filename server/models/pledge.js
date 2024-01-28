const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const PledgeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: String,
  details: String,
  amount: Number,
  dateDue: Date,
  dateCreated: Date,
  dateUpdated: Date,
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
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
  completed: Boolean,
  success: Boolean,
});

PledgeSchema.index({ location: "2dsphere" });

const Pledge = model("Pledge", PledgeSchema);
module.exports = Pledge;
