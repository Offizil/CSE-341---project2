const Validator = require("validatorjs");

const validator = (body, rules, customMessages, callback) => {
  const validation = new Validator(body, rules, customMessages);
  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors, false));
};

Validator.register(
  "integer",
  function (value) {
    return Number.isInteger(Number(value));
  },
  "The :attribute must be an integer."
);

module.exports = validator;
