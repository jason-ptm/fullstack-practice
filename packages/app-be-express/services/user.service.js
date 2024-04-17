const bcrypt = require("bcrypt");
const { models } = require("../libs/sequelize");
const jwt = require("jsonwebtoken");
const { config } = require("../config/config");

class UserService {
  constructor() {}

  async create(data) {
    const hash = await bcrypt.hash(data.account.password, 10);
    const newUser = await models.User.create(
      {
        ...data,
        account: {
          ...data.account,
          password: hash,
        },
      },
      {
        include: ["account"],
      }
    );
    const token = jwt.sign({ sub: newUser.id }, config.jwtSecret);
    return {
      data: {
        id: newUser.id,
        fullName: newUser.fullName,
        accountId: newUser.accountId,
      },
      token,
    };
  }

  async getOne(parms) {
    const user = await models.User.findOne({
      where: {
        ...parms,
      },
    });

    return user;
  }

  async update(id, data) {
    const model = await this.getOne({ id });
    const newUser = await model.update(data);
    return newUser;
  }

  async checkUserAccount(id) {
    const user = await models.User.findByPk(id, {
      include: {
        association: "account",
      },
    });
    return user;
  }
}

module.exports = UserService;
