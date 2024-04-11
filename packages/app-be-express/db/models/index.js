const { Account, AccountSchema } = require("./account.model");
const { Interaction, InteractionSchema } = require("./interaction.model");
const { Post, PostSchema } = require("./post.model");
const { User, UserSchema } = require("./user.model");

function setUpModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Account.init(AccountSchema, Account.config(sequelize));
  Post.init(PostSchema, Account.config(sequelize));
  Interaction.init(InteractionSchema, Account.config(sequelize));

  User.associate(sequelize.models);
  Account.associate(sequelize.models);
  Post.associate(sequelize.models);
  Interaction.associate(sequelize.models);
}

module.exports = setUpModels;
