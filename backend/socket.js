let ioInstance;

function initIO(server) {
  const { Server } = require("socket.io");
  ioInstance = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

  ioInstance.on("connection", (socket) => {
    console.log("⚡ New client connected");
    socket.on("disconnect", () => console.log("❌ Client disconnected"));
  });

  return ioInstance;
}

function getIO() {
  if (!ioInstance) throw new Error("Socket.io not initialized!");
  return ioInstance;
}

module.exports = { initIO, getIO };
