
const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

// Get all staff
const getAllstaffs = async (req, res) => {
  // #swagger.tags = ['staffs']
  try {
    const db = mongodb.getDatabase().db();
    const result = await db.collection("staffs").find();
    const staffs = await result.toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(staffs);
  } catch (error) {
    console.error("Error fetching all staffs:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Get single staff by ID
const getSinglestaff = async (req, res) => {
  // #swagger.tags = ['staffs']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json("Must use a valid staff id to find a staff.");
      return;
    }

    const staffId = new ObjectId(req.params.id);
    const db = mongodb.getDatabase().db();
    const result = await db.collection("staffs").find({ _id: staffId });
    const staffs = await result.toArray();

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(staffs[0]);
  } catch (error) {
    console.error("Error fetching single staff:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Create new staff
const createstaff = async (req, res) => {
  // #swagger.tags = ['staffs']
  try {
    const db = mongodb.getDatabase().db();
    const staff = {
      name: req.body.name,
      age: req.body.age,
      rating: req.body.rating,
      position: req.body.position,
      team: req.body.team,
      trophies: req.body.trophies,
    };

    const result = await db.collection("staffs").insertOne(staff);

    if (result.acknowledged) {
      res.status(201).json(result);
    } else {
      res
        .status(500)
        .json(result.error || "An error occurred while creating the staff.");
    }
  } catch (error) {
    console.error("Error creating staff:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Update existing staff
const modifystaff = async (req, res) => {
  // #swagger.tags = ['staffs']
  try {
    const staffId = new ObjectId(req.params.id);
    const db = mongodb.getDatabase().db();
    const staff = {
      name: req.body.name,
      age: req.body.age,
      rating: req.body.rating,
      position: req.body.position,
      team: req.body.team,
      trophies: req.body.trophies,
    };

    const result = await db
      .collection("staffs")
      .updateOne({ _id: staffId }, { $set: staff });

    if (result.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(result.error || "An error occurred while updating the staff.");
    }
  } catch (error) {
    console.error("Error modifying staff:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Delete staff
const deletestaff = async (req, res) => {
  // #swagger.tags = ['staffs']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json("Must use a valid staff id to delete a staff.");
      return;
    }

    const staffId = new ObjectId(req.params.id);
    const db = mongodb.getDatabase().db();
    const result = await db.collection("staffs").deleteOne({ _id: staffId });

    if (result.deletedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(result.error || "An error occurred while deleting the staff.");
    }
  } catch (error) {
    console.error("Error deleting staff:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  getAllstaffs,
  getSinglestaff,
  createstaff,
  modifystaff,
  deletestaff,
};
