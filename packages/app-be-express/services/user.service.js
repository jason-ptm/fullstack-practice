const bcrypt = require("bcrypt");
const { models } = require("../libs/sequelize");
const jwt = require("jsonwebtoken");

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
    const token = jwt.sign({ id: newUser.id });
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
}

module.exports = UserService;
