const express = require("express");
const router = express.Router();

router.use("/", require("./swagger")); // Swagger documentation route

router.get("/", (req, res) => {
  // #swagger.tags = ['Hello World']
  res.send("Hello World. Welcome to the new week 3 assignment!");
});

router.use("/players", require("./players")); // player routes

module.exports = router;
