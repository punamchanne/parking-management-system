
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /api/users/register - Create new user for monitoring
router.post('/register', async (req, res) => {
  try {
    const { name, vehicle_number, email } = req.body;
    
    // Clean vehicle number: alphanumeric only for consistent lookup
    const cleanVehicle = vehicle_number ? String(vehicle_number).replace(/[^A-Z0-9]/gi, '').toUpperCase() : "";

    // Check if user already exists
    const existingUser = await User.findOne({ vehicle_number: cleanVehicle });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User with this vehicle number already exists' });
    }

    const user = new User({ name, vehicle_number: cleanVehicle, email });
    await user.save();
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/users/login - Login route
router.post('/login', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Check if it's the environment-configured admin
    if (email === process.env.ADMIN_EMAIL) {
      return res.json({ 
        success: true, 
        user: { 
          name: 'System Admin', 
          email: process.env.ADMIN_EMAIL, 
          vehicle_number: 'ADMIN_001' 
        } 
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/users/violations/:vehicleNumber - Fetch info for a specific user
router.get('/violations/:vehicleNumber', async (req, res) => {
  try {
    const vehicleLog = await require('../models/Vehicle').find({ 
        vehicle_number: req.params.vehicleNumber, 
        status: 'violation' 
    });
    res.json(vehicleLog);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE /api/users/clear - Dangerous: Removes all users
router.delete('/clear', async (req, res) => {
  try {
    const UserModel = require('../models/User');
    await UserModel.deleteMany({});
    res.json({ success: true, message: 'All users cleared successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
