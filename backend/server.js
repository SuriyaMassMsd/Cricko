const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const tournamentRoutes = require("./routes/tournamentRoutes");
const Players = require("./models/Players");
const cors = require("cors");

// Load .env file
dotenv.config();

// Environment variables
const PORT = process.env.SERVER_PORT || 5000;
const MONGO_DB = process.env.DB_CONNECT;

// Middleware (optional if you're sending JSON later)
app.use(express.json());
app.use(cors());
// Root route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Cricko Scorer!",
  });
});

app.get("/players/:teamId", async (req, res) => {
  try {
    const players = await Players.find({ team: req.params.teamId });
    res.status(200).json(players);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch players" });
  }
});

app.use("/api/tournaments", tournamentRoutes);

// Start server only after DB connects
mongoose
  .connect(MONGO_DB)
  .then(() => {
    console.log("✅ MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });
