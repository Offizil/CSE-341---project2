const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

// mongodb.getDatabase.db()

const getAllplayers = async (req, res) => {
  // #swagger.tags = ['players']

  const db = mongodb.getDatabase().db();
  const result = await db.collection("players").find();
  result.toArray().then((players) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(players);
  });
};

const getSingleplayer = async (req, res) => {
  // #swagger.tags = ['players']

  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid player id to find a player.");
    return;
  }
  const playerId = new ObjectId(req.params.id);

  const db = mongodb.getDatabase().db();
  const result = await db.collection("players").find({ _id: playerId });

  result.toArray().then((players) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(players[0]);
  });
};

const createplayer = async (req, res) => {
  // #swagger.tags = ['players']
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
};

const modifyplayer = async (req, res) => {
  // #swagger.tags = ['players']
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
      .json(result.error || "an error occurred while updating the player.");
  }
};

const deleteplayer = async (req, res) => {
  // #swagger.tags = ['players']
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
};

module.exports = {
  getAllplayers,
  getSingleplayer,
  createplayer,
  modifyplayer,
  deleteplayer,
};
