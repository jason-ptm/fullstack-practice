const { Strategy, ExtractJwt } = require("passport-jwt");
const boom = require("@hapi/boom");

const { config } = require("../../config/config");
const UserService = require("../../services/user.service");

const service = new UserService();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
};

const JwtStrategy = new Strategy(options, async (payload, done) => {
  const user = await service.checkUserAccount(payload.sub);
  if (!user.account.deletedAt) return done(null, payload);
  return done(boom.unauthorized(), null);
});

module.exports = JwtStrategy;
