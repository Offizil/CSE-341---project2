const express = require("express");
const router = express.Router();

const validation = require("../utilities/validate");
const staffsController = require("../controllers/staffs");

router.get("/", staffsController.getAllstaffs);

router.get("/:id", staffsController.getSinglestaff);

router.post("/", validation.saveStaff, staffsController.createstaff);
router.put("/:id", validation.saveStaff, staffsController.modifystaff);
router.delete("/:id", staffsController.deletestaff);

module.exports = router;
