const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const fixedUsers = [
    { name: "Piyush Shete", email: "piyushdhananjayshete1234@gmail.com", phone: "9876543210", vehicle_number: "MH20EE7602", password: "user123" },
    { name: "Admin Portal", email: "smartparkingsystem21@gmail.com", phone: "9876543211", vehicle_number: "MH12JC9944", password: "user123" },
    { name: "Sensor Node", email: "tempandhumidity123@gmail.com", phone: "9876543212", vehicle_number: "TN83MF7777", password: "user123" },
    { name: "Aashu Pawar", email: "aashu.pwar4912@gmail.com", phone: "9876543213", vehicle_number: "MH12MF1787", password: "user123" },
    { name: "Punam Channe", email: "punamchanne51@gmail.com", phone: "9876543214", vehicle_number: "TN02AZ5683", password: "user123" }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB for Seeding...");
        
        // Clear existing users to avoid duplicates during testing
        await User.deleteMany({});
        
        // Add fixed users
        await User.insertMany(fixedUsers);
        
        console.log("SUCCESS: 5 Fixed User Accounts Created!");
        process.exit();
    } catch (err) {
        console.error("SEED FAIL:", err);
        process.exit(1);
    }
};

seedDB();
