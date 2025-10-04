const validator = require("./validator");

const savePlayer = (req, res, next) => {
  const playerSchema = {
    name: "required|string",
    weight: "required|string",
    email: "required|email",
    DOB: "required|date",
    country: "required|string",
    field_position: "required|string",
    sex: "required|string",
  };

  validator(req.body, playerSchema, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

const saveStaff = (req, res, next) => {
  const staffSchema = {
    name: "required|string",
    age: "required|integer",
    rating: "required|integer",
    position: "required|string",
    team: "required|string",
    trophies: "required|integer",
  };

  validator(req.body, staffSchema, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

module.exports = {
  savePlayer,
  saveStaff,
};
