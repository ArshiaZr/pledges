const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const PledgeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: String,
    details: String, 
    amount: Number,
    dateDue: Date,
    dateCreated: Date,
    dateUpdated: Date,
    location: String,
    repeat: String,
    link: String,
    priority: {
        type: Number,
        min: 0,
        max: 2
    }
})

const Pledge = model("Pledge", PledgeSchema);
module.exports = Pledge;