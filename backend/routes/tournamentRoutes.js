const express = require("express");
const router = express.Router();
const { createTournament } = require("../controllers/tournamentController");
const { createTeam } = require("../controllers/teamController");
const { createPlayers } = require("../controllers/playersController");

router.post("/", createTournament);
router.post("/createTeam", createTeam);
router.post("/createPlayer", createPlayers);

module.exports = router;
