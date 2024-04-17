const { Strategy, ExtractJwt } = require("passport-jwt");
const boom = require("@hapi/boom");

const { config } = require("../../config/config");
const AuthService = require("../../services/auth.service");

const service = new AuthService();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
};

const JwtStrategy = new Strategy(options, async (payload, done) => {
  const user = await service.getOne(payload.sub);
  if (user) return done(null, payload);
  return done(boom.unauthorized(), null);
});

module.exports = JwtStrategy;
