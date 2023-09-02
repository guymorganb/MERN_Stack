const mongoose = require('mongoose');
require('dotenv').config();
console.log(process.env)
const connectDB = async () => {
    try {
        const dbName = 'googlebooks'; // Connects to lowercase 't'est database
        // The options {useNewUrlParser: true, useUnifiedTopology: true} are provided to avoid deprecation warnings.
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log(`Connected to MongoDB, DB:${dbName}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

module.exports = connectDB;