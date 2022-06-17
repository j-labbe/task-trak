const mongoose = require('mongoose');
const log = require('../utils/logger');

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    log(`MongoDB connected: ${conn.connection.host}`.cyan.underline.bold);
}

module.exports = connectDB;