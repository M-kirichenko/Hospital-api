const genToken = (tokenParams) => {
  const jwt = require("jsonwebtoken");
  const token = jwt.sign(tokenParams, process.env.TOKEN_KEY, {
    expiresIn: "2h",
  });
  return token;
};

const validateVisitBody = (body) => {
  const moment = require("moment");
  const { validName } = require("./validator");

  const errors = [];
  const { text, date, patient_name } = body;

  if (text && !text.length) {
    errors.push("Visit text can't be empty");
  }

  if (patient_name && !validName(patient_name))
    errors.push(
      "Patient name must be composed only of letters and be at least 3 letters long"
    );

  if (date && !moment(date, "DD.MM.YYYY").isValid())
    errors.push("Invalid date");

  return errors;
};
module.exports = { genToken, validateVisitBody };
