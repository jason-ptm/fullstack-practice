const boom = require("@hapi/boom");
const { Strategy, ExtractJwt } = require("passport-jwt");

function validatorHandler(schema, property) {
  return (req, _res, next) => {
    const data = req[property];

    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
      return next(boom.badRequest(error));
    }
    return next();
  };
}

function checkOwnerHandler(property) {
  return (req, res, next) => {
    const { ownerId } = req[property];
    const tokenId = req.user.sub;
    if (ownerId === tokenId) return next();
    throw boom.unauthorized();
  };
}

module.exports = { validatorHandler, checkOwnerHandler };
