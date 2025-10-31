const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const Vehicle = require("./models/vehicle");

async function run() {
  try {
    await Vehicle.collection.createIndex({ name: 1 }, { unique: true });
    console.log("✅ Unique index created on name field");
    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error creating index:", err);
    mongoose.disconnect();
  }
}

run();

