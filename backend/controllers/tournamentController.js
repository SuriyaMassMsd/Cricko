const tournament = require("../models/Tournament");

exports.createTournament = async (req, res) => {
  try {
    const { name, matchType, startDate } = req.body;

    const tournamentMatch = await tournament.create({
      name,
      matchType,
      startDate,
    });
    res.status(200).json(tournamentMatch);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
