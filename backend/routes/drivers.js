const express = require("express");
const router = express.Router();
const Driver = require("../models/driver");

// GET all drivers
router.get("/", async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.json(drivers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST - create new driver
router.post("/", async (req, res) => {
  const driver = new Driver(req.body);
  try {
    const savedDriver = await driver.save();
    res.status(201).json(savedDriver);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT - update existing driver
router.put("/:id", async (req, res) => {
  try {
    const updatedDriver = await Driver.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedDriver);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE - remove driver
router.delete("/:id", async (req, res) => {
  try {
    await Driver.findByIdAndDelete(req.params.id);
    res.json({ message: "Driver deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
// routes/drivers.js
// const express = require("express");
// const router = express.Router();
// const Driver = require("../models/driver");

// // GET all drivers
// router.get("/", async (req, res) => {
//   try {
//     const drivers = await Driver.find();
//     res.json(drivers);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // POST, PUT, DELETE already exist
// module.exports = router;


