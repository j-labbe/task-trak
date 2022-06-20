const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    belongsTo: {
        type: String, // auth0|[userId]
    }
});

module.exports = mongoose.model('Client', ClientSchema);