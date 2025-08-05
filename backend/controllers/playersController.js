const Players = require("../models/Players");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

exports.upload = upload.single("profilePic");

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

    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }

    cloudinary.uploader
      .upload_stream({ resource_type: "image" }, async (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: "Failed to upload image" });
        }

        const newPlayer = await Players.create({
          playerName,
          role,
          teamId,
          battingStyle,
          bowlingStyle,
          jerseyNumber,
          profilePic: result.secure_url,
        });

        res.status(201).json({
          message: "Player created successfully",
          player: newPlayer,
        });
      })
      .end(req.file.buffer);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.getPlayerByTeams = async (req, res) => {
  try {
    const teamId = req.params.teamId;
    const players = await Players.find({ teamId });
    res.status(200).json(players);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
