const ApiError = require("../exeptions/api-error");

module.exports = function (err, req, res, next) {
  console.log(err);
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ mesage: err.message, errors: err.errors });
  }
  return res.status(500).json({ message: "An unexpected server error!" });
};
