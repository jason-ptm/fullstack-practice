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

  async getOneByUserId(id) {
    return await models.Account.findOne({
      include: {
        association: "user",
        where: {
          id,
        },
      },
    });
  }

  async update(user) {
    const checkedUser = await this.getOneByUserId(user.ownerId);
    if (checkedUser) {
      if (user.data.password) {
        const checkedPassword = await bcrypt.compare(user.data.password, checkedUser.password);
        if (!checkedPassword) {
          const password = await bcrypt.hash(user.data.password, 10);
          user.data.password = password;
        } else {
          throw boom.badData();
        }
      }
      await checkedUser.update(user.data);
      return { done: true };
    }
    throw boom.notFound();
  }
}

module.exports = AuthService;
