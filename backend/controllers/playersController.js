<<<<<<< HEAD
=======
const Players = require("../models/Players");
>>>>>>> ae1969f (cricko player added with team)
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
<<<<<<< HEAD
    res.status(500).json({ error: err.message });
=======
    res.status(500).json({ error: e.message });
  }
};

exports.getPlayerByTeams = async (req, res) => {
  try {
    const { teamId } = req.params.teamId;
    const players = await Players.find(teamId);
    res.status(200).json(players);
  } catch (e) {
    res.status(500).json({ error: e.message });
>>>>>>> ae1969f (cricko player added with team)
  }
};
