const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  status: { type: String, required: true },
  speed: { type: Number, default: 0 },
  lat: { type: Number, default: 0 },
  lng: { type: Number, default: 0 },
});

// Prevent overwrite errors
module.exports = mongoose.models.Vehicle || mongoose.model("Vehicle", vehicleSchema);
