const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  teamName: { type: String, require: true },
  tournamentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tournament",
    required: true,
  },
  teamProfilePic: { type: String, required: true },
});

module.exports = mongoose.model("Team", teamSchema);
