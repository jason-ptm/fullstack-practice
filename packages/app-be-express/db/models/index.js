const { Account, AccountSchema } = require("./account.model");
const { Interaction, InteractionSchema } = require("./interaction.model");
const { Post, PostSchema } = require("./post.model");
const { User, UserSchema } = require("./user.model");

function setUpModels(sequelize) {
  Account.init(AccountSchema, Account.config(sequelize));
  User.init(UserSchema, User.config(sequelize));
  Post.init(PostSchema, Post.config(sequelize));
  Interaction.init(InteractionSchema, Interaction.config(sequelize));

  Account.associate(sequelize.models);
  User.associate(sequelize.models);
  Post.associate(sequelize.models);
  Interaction.associate(sequelize.models);
}

module.exports = setUpModels;
