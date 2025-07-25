const playerSchema = require("../models/Players");

exports.createPlayers = async (req, res) => {
  try {
    const {
      playerName,
      role,
      teamId,
      battingStyle,
      bowlingStyle,
      jerseyNumber,
    } = req.body;
    const createPlayer = await playerSchema.create({
      playerName,
      role,
      teamId,
      battingStyle,
      bowlingStyle,
      jerseyNumber,
    });
    res
      .status(201)
      .json({ message: "player created successfully", playerName });
  } catch (e) {
    res.status(500).json({ error: err.message });
  }
};
