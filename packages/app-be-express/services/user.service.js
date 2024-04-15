const bcrypt = require("bcrypt");
const { models } = require("../libs/sequelize");

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
      id: newUser.id,
      fullName: newUser.fullName,
      age: newUser.age,
      accountId: newUser.accountId,
    };
  }

  async getOne(id) {
    const user = await models.User.findByPk(id, {});

    return user;
  }

  async update(id, data) {
    const model = await this.getOne(id);
    const newUser = await model.update(data);
    return newUser;
  }
}

module.exports = UserService;
