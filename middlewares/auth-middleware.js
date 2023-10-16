const ApiError = require("../exeptions/api-error");
const tokenService = require("../service/token-service");

module.exports = function (req, res, next) {
  try {
    const rawHeaders = req.rawHeaders;
    if (!rawHeaders) {
      return next(ApiError.UnauthorizedError(e));
    }

    const accessToken = rawHeaders.filter(header => header.includes("Bearer "))[0].split(" ")[1];

    if (!accessToken) {
      return next(ApiError.UnauthorizedError(e));
    }

    const userDataFromAccessToken = tokenService.validateAccessToken(accessToken);

    if (!userDataFromAccessToken) {
      return next(ApiError.UnauthorizedError(e));
    }

    req.user = userDataFromAccessToken;
    console.log({ accessToken, userDataFromAccessToken });
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError(e));
  }
};
