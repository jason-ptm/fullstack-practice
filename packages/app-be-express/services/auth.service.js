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

  async changePassword(user) {
    const checkedUser = await models.Account.findOne({
      include: {
        association: "user",
        where: {
          id: user.ownerId,
        },
      },
    });
    const checkedPassword = await bcrypt.compare(user.password, checkedUser.password);
    if (!checkedPassword) {
      const password = await bcrypt.hash(user.password, 10);
      await checkedUser.update({
        password,
      });
      return { done: true };
    }
    throw boom.badData();
  }
}

module.exports = AuthService;
