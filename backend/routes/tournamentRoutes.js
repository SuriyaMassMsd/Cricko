const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const { createTournament } = require("../controllers/tournamentController");
const { createTeam } = require("../controllers/teamController");
const { createPlayers } = require("../controllers/playersController");
=======
const {
  createTournament,
  getTournaments,
} = require("../controllers/tournamentController");
const { createTeam, getTeamById } = require("../controllers/teamController");
const {
  createPlayers,
  getPlayerByTeams,
} = require("../controllers/playersController");
>>>>>>> ae1969f (cricko player added with team)

router.post("/", createTournament);
router.post("/createTeam", createTeam);
router.post("/createPlayer", createPlayers);
<<<<<<< HEAD
=======
router.get("/getMatch", getTournaments);
router.get("/getTeams/:teamId", getTeamById);
router.get("/getTeamPlayer/:teamId", getPlayerByTeams);
>>>>>>> ae1969f (cricko player added with team)

module.exports = router;
