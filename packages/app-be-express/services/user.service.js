const bcrypt = require("bcrypt");
const { models } = require("../libs/sequelize");
const signToken = require("../utils/signToken.util");

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
    return {
      data: {
        id: newUser.id,
        fullName: newUser.fullName,
        age: newUser.age,
        accountId: newUser.accountId,
      },
      token: signToken({
        id: newUser.accountId,
      }),
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
