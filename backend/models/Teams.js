const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  teamName: { type: String, require: true },
});

module.exports = mongoose.model("Team", teamSchema);
