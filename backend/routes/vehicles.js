const express = require("express");
const router = express.Router();
const Vehicle = require("../models/vehicle");
const { getIO } = require("../socket");

// GET all vehicles
router.get("/", async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST – Add vehicle
router.post("/", async (req, res) => {
  try {
    const { name, status, speed, lat, lng } = req.body;

    if (!name || !status) {
      return res.status(400).json({ error: "Name and status are required" });
    }

    // Check duplicate
    const existing = await Vehicle.findOne({ name });
    if (existing) return res.status(400).json({ error: "Vehicle name already exists" });

    const vehicle = await Vehicle.create({
      name,
      status,
      speed: Number(speed),
      lat: Number(lat),
      lng: Number(lng),
    });

    getIO().emit("vehiclesUpdated"); // update clients
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT – Update vehicle
router.put("/:id", async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ error: "Vehicle not found" });

    const { name, status, speed, lat, lng } = req.body;

    if (name && name !== vehicle.name) {
      const duplicate = await Vehicle.findOne({ name });
      if (duplicate) return res.status(400).json({ error: "Vehicle name already exists" });
      vehicle.name = name;
    }

    if (status) vehicle.status = status;
    if (speed !== undefined) vehicle.speed = Number(speed);
    if (lat !== undefined) vehicle.lat = Number(lat);
    if (lng !== undefined) vehicle.lng = Number(lng);

    await vehicle.save();
    getIO().emit("vehiclesUpdated");
    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE – Remove vehicle
router.delete("/:id", async (req, res) => {
  try {
    await Vehicle.findByIdAndDelete(req.params.id);
    getIO().emit("vehiclesUpdated");
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
