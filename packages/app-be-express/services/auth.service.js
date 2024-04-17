const { models } = require("../libs/sequelize");
const bcrypt = require("bcrypt");
const boom = require("@hapi/boom");
const jwt = require("jsonwebtoken");
const UserService = require("./user.service");
const { config } = require("../config/config");

class AuthService {
  userService = new UserService();

  constructor() {}

  async login(data) {
    const account = await models.Account.findOne({
      where: {
        email: data.email,
      },
    });

    if (account) {
      const checkPassword = await bcrypt.compare(data.password, account.password);
      if (checkPassword) {
        const user = await this.userService.getOne({ accountId: account.id });
        const token = jwt.sign({ sub: user.id }, config.jwtSecret);
        return {
          data: {
            id: user.id,
            fullName: user.fullName,
            accountId: user.accountId,
          },
          token,
        };
      }
    }
    throw boom.unauthorized();
  }

  async getOne(id) {
    return await models.Account.findByPk(id);
  }
}

module.exports = AuthService;
