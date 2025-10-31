const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  license: {
    type: String,
    required: [true, "License is required"],
    unique: true,
    trim: true,
  },
  phone: {
    type: String,
    required: [true, "Phone is required"],
    unique: true,
    trim: true,
  },
});

module.exports = mongoose.model("Driver", driverSchema);
