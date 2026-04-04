
const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');
const stringSimilarity = require('string-similarity');

// POST /api/update - AI sends data here
router.post('/update', async (req, res) => {
  try {
    const { vehicle_number, vehicle_count, status: reqStatus, fine: reqFine, timestamp, duration } = req.body;
    
    // Clean and validate vehicle number
    let cleanPlate = vehicle_number ? String(vehicle_number).replace(/[^A-Z0-9]/gi, '').toUpperCase() : "UNKNOWN";
    if (cleanPlate === "NONE" || cleanPlate === "NULL" || cleanPlate === "") cleanPlate = "UNKNOWN";

    // SMART FUZZY MATCHING LOGIC
    if (cleanPlate !== "UNKNOWN") {
      const allUsers = await User.find({}, 'vehicle_number');
      const registeredPlates = allUsers.map(u => u.vehicle_number);
      
      if (registeredPlates.length > 0) {
        const matches = stringSimilarity.findBestMatch(cleanPlate, registeredPlates);
        // If similarity is > 75%, assume it's the registered vehicle
        if (matches.bestMatch.rating > 0.75) {
          console.log(`>>> [SMART MATCH] Corrected ${cleanPlate} to ${matches.bestMatch.target} (Score: ${matches.bestMatch.rating})`);
          cleanPlate = matches.bestMatch.target;
        }
      }
    }

    const CAPACITY_LIMIT = 10;
    let status = reqStatus || 'normal';
    let fine = reqFine || 0;

    // Logic for overcapacity if not already set by AI
    if (status === 'normal' && vehicle_count > CAPACITY_LIMIT) {
      status = 'violation';
      fine = 500;
    }

    // Violation Email Logic
    if (status === 'violation') {
      const user = await User.findOne({ vehicle_number: cleanPlate });
      if (user && user.email) {
        try {
          await sendEmail({
            email: user.email,
            subject: 'Parking Violation Alert',
            message: `Your vehicle ${cleanPlate} has been detected during a violation event. A fine of ₹${fine} has been issued.`,
            vehicle_number: cleanPlate
          });
          console.log(`Email sent to ${user.email} for vehicle ${cleanPlate}`);
        } catch (emailErr) {
          console.error(`Email Error: ${emailErr.message}`);
        }
      }
    }

    // Log to DB
    const vehicleLog = new Vehicle({
      vehicle_number: cleanPlate,
      entry_time: timestamp || new Date(),
      status: status,
      vehicle_count_at_entry: vehicle_count || 0,
      fine: fine,
      duration: duration || "0s"
    });

    await vehicleLog.save();

    res.status(200).json({
      success: true,
      message: 'AI data updated and logged',
      plate: cleanPlate,
      violation: status === 'violation'
    });
  } catch (error) {
    console.error("Backend /update Error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/vehicles - Admin fetching all logs
router.get('/logs', async (req, res) => {
  try {
    const logs = await Vehicle.find().sort({ entry_time: -1 }).limit(50);
    res.json(logs);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/stats - Dashboard statistics
router.get('/stats', async (req, res) => {
  try {
    const totalVehicles = await Vehicle.countDocuments();
    const totalViolations = await Vehicle.countDocuments({ status: 'violation' });
    const lastEntry = await Vehicle.findOne().sort({ entry_time: -1 });
    const recentLogs = await Vehicle.find().sort({ entry_time: -1 }).limit(5); // Latest 5 identifications
    
    res.json({
        totalVehicles,
        totalViolations,
        currentCount: lastEntry ? lastEntry.vehicle_count_at_entry : 0,
        capacity: 10,
        recentLogs
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
