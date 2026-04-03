
const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  vehicle_number: {
    type: String,
    required: true
  },
  entry_time: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['normal', 'violation'],
    default: 'normal'
  },
  vehicle_count_at_entry: {
    type: Number,
    required: true
  },
  fine: {
    type: Number,
    default: 0
  },
  duration: {
    type: String,
    default: "0s"
  }
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', VehicleSchema);
