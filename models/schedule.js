const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    organizer:{
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    time: {
        type: String
    },
    meetURL: {
        type: String,
        required: true
    },
    shareURL: {
        type: String,
        required: true
    }
})

const schedule = mongoose.model("schedule", scheduleSchema);

module.exports = schedule;
