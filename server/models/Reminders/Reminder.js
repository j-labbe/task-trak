const mongoose = require("mongoose");

const ReminderSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    reminderDateTime: {
        type: String, // ISO 8601
    },
    belongsTo: {
        type: String,
    },
    status: {
        type: Boolean,
    }
});

module.exports = mongoose.model('Reminder', ReminderSchema);