const { models } = require("../libs/sequelize");
const bcrypt = require("bcrypt");
const boom = require("@hapi/boom");
const signToken = require("../utils/signToken.util");
const UserService = require("./user.service");

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
      const checkPassword = bcrypt.compare(data.password, account.password);
      if (checkPassword) {
        const token = signToken({ id: account.id });
        const user = await this.userService.getOne({ accountId: account.id });
        return {
          data: {
            id: user.id,
            fullName: user.fullName,
            age: user.age,
            accountId: user.accountId,
          },
          token,
        };
      }
    }
    boom.notFound("user not found");
  }
}

module.exports = AuthService;
