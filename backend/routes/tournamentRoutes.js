const express = require("express");
const router = express.Router();

const {
  createTournament,
  getTournaments,
} = require("../controllers/tournamentController");
const {
  createTeam,
  getTeamById,
  getTeams,
} = require("../controllers/teamController");
const {
  createPlayers,
  getPlayerByTeams,
  upload,
} = require("../controllers/playersController");
const { upload: uploadTeam } = require("../controllers/teamController");

router.post("/createTournament", createTournament);
router.post("/createTeam", uploadTeam, createTeam);
router.post("/createPlayer", upload, createPlayers);
router.get("/getMatch", getTournaments);
router.get("/getTeams", getTeams);
router.get("/getTeams/:teamId", getTeamById);
router.get("/getTeamPlayer/:teamId", getPlayerByTeams);

module.exports = router;
