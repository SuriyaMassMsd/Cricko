const mongoose = require("mongoose");

const tournamentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  matchType: {
    type: String,
    required: true, // ✅ Marked as required
    enum: ["league", "knockout", "tri-series", "series", "single"],
  },
  startDate: { type: Date },
});

module.exports = mongoose.model("tournament", tournamentSchema);
