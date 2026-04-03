
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const User = require('../models/User');

// Load env vars
dotenv.config({ path: '../.env' });

const clearUsers = async () => {
    try {
        // Connect to MongoDB
        await connectDB();
        
        console.log('--- Database Connected ---');
        
        // Delete all users
        const result = await User.deleteMany({});
        
        console.log(`Successfully deleted ${result.deletedCount} users from database.`);
        console.log('Database is now clean. You can register new users.');
        
        // Close connection
        mongoose.connection.close();
        process.exit(0);
    } catch (err) {
        console.error('Error during clearing users:', err.message);
        process.exit(1);
    }
};

clearUsers();
