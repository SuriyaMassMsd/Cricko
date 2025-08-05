const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  playerName: { type: String, required: true },
  role: {
    type: String,
    enum: ["batsman", "bowler", "all-rounder", "wicket-keeper"],
    required: true,
  },
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  battingStyle: { type: String }, // e.g., "Right-hand bat"
  bowlingStyle: { type: String }, // e.g., "Right-arm fast"
  jerseyNumber: Number,
  profilePic: { type: String, required: true },
});

module.exports = mongoose.model("Player", playerSchema);
