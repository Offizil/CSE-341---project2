const express = require("express");
const router = express.Router();

const validation = require("../utilities/validate");
const playersControllers = require("../controllers/players");

router.get("/", playersControllers.getAllplayers);

router.get("/:id", playersControllers.getSingleplayer);

router.post("/", validation.savePlayer, playersControllers.createplayer);
router.put("/:id", validation.savePlayer, playersControllers.modifyplayer);
router.delete("/:id", playersControllers.deleteplayer);



module.exports = router;


