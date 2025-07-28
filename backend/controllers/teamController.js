const teamSchema = require("../models/Teams");

exports.createTeam = async (req, res) => {
  try {
    const { teamName } = req.body;
    const creatingTeam = await teamSchema.create({ teamName });
    res.status(201).json({ message: "Team Created Successfully", teamName });
  } catch (e) {
    res.status(500).json({ error: err.message });

    res.status(500).json({ error: e.message });
  }
};

exports.getTeamById = async (req, res) => {
  try {
    const { teamId } = req.params;
    const getTeamByIds = await teamSchema.findById(teamId);
    res.status(200).json({ team: getTeamByIds });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
exports.getTeams = async (req, res) => {
  try {
    const getTeam = await teamSchema.find({});
    res.status(200).json(getTeam);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
