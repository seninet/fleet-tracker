const Vehicle = require("./models/vehicle");

const loadSampleData = async () => {
  const count = await Vehicle.countDocuments();
  if (count === 0) {
    await Vehicle.insertMany([
      {
        name: "Truck 1",
        status: "On route",
        speed: 60,
        lat: 40.7128,
        lng: -74.0060,
      },
      {
        name: "Van 2",
        status: "Idle",
        speed: 80,
        lat: 40.7306,
        lng: -73.9352,
      },
      {
        name: "Car 3",
        status: "On route",
        speed: 50,
        lat: 40.7410,
        lng: -73.9500,
      },
    ]);
    console.log("✅ Sample vehicles loaded");
  } else {
    console.log("🚗 Vehicles already exist in DB");
  }
};

module.exports = loadSampleData;



