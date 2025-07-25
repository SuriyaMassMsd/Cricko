const teamSchema = require("../models/Teams");

exports.createTeam = async (req, res) => {
  try {
    const { teamName } = req.body;
    const creatingTeam = await teamSchema.create({ teamName });
    res.status(201).json({ message: "Team Created Successfully", teamName });
  } catch (e) {
    res.status(500).json({ error: err.message });
  }
};
