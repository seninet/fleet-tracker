const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const http = require("http");
const { initIO } = require("./socket");

const vehicleRoutes = require("./routes/vehicles");
const driverRoutes = require("./routes/drivers");
const loadSampleUsers = require("./sampleUser");
const loadSampleData = require("./sampleData");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Routes
app.use("/auth", require("./routes/auth"));
app.use("/vehicles", vehicleRoutes);
app.use("/drivers", driverRoutes);

app.get("/", (req, res) => res.send("Server is running"));

// HTTP + Socket.io
const server = http.createServer(app);
const io = initIO(server);

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ MongoDB connected");
  loadSampleUsers();
  loadSampleData();
})
.catch(err => console.error("❌ MongoDB connection error:", err));

// Start server
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
