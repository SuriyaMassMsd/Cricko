const Teams = require("../models/Teams");
const teamSchema = require("../models/Teams");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

exports.upload = upload.single("teamProfilePic");

exports.createTeam = async (req, res) => {
  try {
    const { teamName, tournamentId } = req?.body;

    if (!req.file || !req.file.buffer) {
      console.log("Missing file or buffer");
      return res.status(400).json({ error: "Image file is required" });
    }

    console.log("Uploading to Cloudinary...");
    cloudinary.uploader
      .upload_stream({ resource_type: "image" }, async (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).json({
            error: "Failed to upload image",
          });
        }
        const newTeam = await Teams.create({
          teamName,
          tournamentId,
          teamProfilePic: result.secure_url,
        });
        res.status(201).json({ message: "Team Created Successfully", newTeam });
      })
      .end(req.file.buffer);
  } catch (e) {
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
