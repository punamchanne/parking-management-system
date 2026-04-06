
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const fixedUsers = [
    { name: "Piyush Shete", email: "piyushdhananjayshete1234@gmail.com", vehicle_number: "MH20EE7602" },
    { name: "Admin Portal", email: "smartparkingsystem21@gmail.com", vehicle_number: "MH12JC9944" },
    { name: "Sensor Node", email: "tempandhumidity123@gmail.com", vehicle_number: "TN83MF7777" },
    { name: "Aashu Pawar", email: "aashu.pwar4912@gmail.com", vehicle_number: "MH12MF1787" },
    { name: "Punam Channe", email: "punamchanne51@gmail.com", vehicle_number: "MH20EE7602" }
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
        console.error("Seed Error:", err);
        process.exit(1);
    }
};

seedDB();
