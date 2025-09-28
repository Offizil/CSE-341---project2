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

module.exports = {
  savePlayer,
};
