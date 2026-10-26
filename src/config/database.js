const mongoose = require('mongoose');

const connectDB = async () => {
    const uri = process.env.MONGO_URI || 'mongodb+srv://rajeshcoer_db_user:eLUq5b72O4zt03DC@cluster0.rfmn8vz.mongodb.net/';
    if (!uri) {
        throw new Error('MongoDB connection URI is not defined in environment variables.');
    }
    await mongoose.connect(uri)
}

module.exports = connectDB;