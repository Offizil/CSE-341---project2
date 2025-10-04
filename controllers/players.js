const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

// Get all players
const getAllplayers = async (req, res) => {
  // #swagger.tags = ['players']
  try {
    const db = mongodb.getDatabase().db();
    const result = await db.collection("players").find();
    const players = await result.toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(players);
  } catch (error) {
    console.error("Error fetching all players:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Get single player by ID
const getSingleplayer = async (req, res) => {
  // #swagger.tags = ['players']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json("Must use a valid player id to find a player.");
      return;
    }

    const playerId = new ObjectId(req.params.id);
    const db = mongodb.getDatabase().db();
    const result = await db.collection("players").find({ _id: playerId });
    const players = await result.toArray();

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(players[0]);
  } catch (error) {
    console.error("Error fetching single player:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Create a new player
const createplayer = async (req, res) => {
  // #swagger.tags = ['players']
  try {
    const db = mongodb.getDatabase().db();
    const player = {
      name: req.body.name,
      weight: req.body.weight,
      email: req.body.email,
      sex: req.body.sex,
      DOB: req.body.DOB,
      country: req.body.country,
      field_position: req.body.field_position,
    };

    const result = await db.collection("players").insertOne(player);

    if (result.acknowledged) {
      res.status(201).json(result);
    } else {
      res
        .status(500)
        .json(result.error || "An error occurred while creating the player.");
    }
  } catch (error) {
    console.error("Error creating player:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Update an existing player
const modifyplayer = async (req, res) => {
  // #swagger.tags = ['players']
  try {
    const playerId = new ObjectId(req.params.id);
    const db = mongodb.getDatabase().db();
    const player = {
      name: req.body.name,
      weight: req.body.weight,
      email: req.body.email,
      sex: req.body.sex,
      DOB: req.body.DOB,
      country: req.body.country,
      field_position: req.body.field_position,
    };

    const result = await db
      .collection("players")
      .updateOne({ _id: playerId }, { $set: player });

    if (result.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(result.error || "An error occurred while updating the player.");
    }
  } catch (error) {
    console.error("Error modifying player:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Delete a player
const deleteplayer = async (req, res) => {
  // #swagger.tags = ['players']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json("Must use a valid player id to delete a player.");
      return;
    }

    const playerId = new ObjectId(req.params.id);
    const db = mongodb.getDatabase().db();
    const result = await db.collection("players").deleteOne({ _id: playerId });

    if (result.deletedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(result.error || "An error occurred while deleting the player.");
    }
  } catch (error) {
    console.error("Error deleting player:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  getAllplayers,
  getSingleplayer,
  createplayer,
  modifyplayer,
  deleteplayer,
};
