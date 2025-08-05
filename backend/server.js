const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const tournamentRoutes = require("./routes/tournamentRoutes");
const Players = require("./models/Players");
const cors = require("cors");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

// Load .env file
dotenv.config();

// Environment variables
const PORT = process.env.SERVER_PORT || 5000;
const MONGO_DB = process.env.DB_CONNECT;
const CLOUD_NAME = process.env.CLOUD_NAME;
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

// Middleware (optional if you're sending JSON later)
app.use(express.json());
app.use(cors());

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: "No file uploaded" });
  }

  cloudinary.uploader
    .upload_stream({ resource_type: "auto" }, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: "Error uploading to Cloudinary" });
      }
      res.json({ public_id: result.public_id, url: result.secure_url });
    })
    .end(req.file.buffer);
});

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
