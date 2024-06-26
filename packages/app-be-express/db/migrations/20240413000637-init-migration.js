"use strict";

const { ACCOUNT_TABLE } = require("../models/account.model");
const { INTERACTION_TABLE } = require("../models/interaction.model");
const { POST_TABLE } = require("../models/post.model");
const { USER_TABLE } = require("../models/user.model");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(ACCOUNT_TABLE, {
      id: {
        allowNull: true,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.Sequelize.literal("gen_random_uuid()"),
      },
      email: {
        unique: true,
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      createdAt: {
        field: "created_at",
        allowNull: true,
        type: "TIMESTAMP",
        defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        field: "updated_at",
        allowNull: true,
        type: "TIMESTAMP",
        defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      deletedAt: {
        field: "deleted_at",
        allowNull: true,
        type: "TIMESTAMP",
      },
    });

    await queryInterface.createTable(USER_TABLE, {
      id: {
        allowNull: true,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.Sequelize.literal("gen_random_uuid()"),
      },
      fullName: {
        field: "full_name",
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      age: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
      },
      accountId: {
        field: "account_id",
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        references: {
          model: ACCOUNT_TABLE,
          key: "id",
        },
      },
    });

    await queryInterface.createTable(POST_TABLE, {
      id: {
        allowNull: true,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      title: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      content: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      userId: {
        field: "user_id",
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        references: {
          model: USER_TABLE,
          key: "id",
        },
      },
      createdAt: {
        field: "created_at",
        allowNull: true,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.Sequelize.fn("NOW"),
      },
      updatedAt: {
        field: "updated_at",
        allowNull: true,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.Sequelize.fn("NOW"),
      },
      deletedAt: {
        field: "deleted_at",
        allowNull: true,
        type: Sequelize.DataTypes.DATE,
        defaultValue: null,
      },
    });

    await queryInterface.createTable(INTERACTION_TABLE, {
      id: {
        allowNull: true,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.Sequelize.Sequelize.literal("gen_random_uuid()"),
      },
      postId: {
        field: "post_id",
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        references: {
          model: POST_TABLE,
          key: "id",
        },
      },
      userId: {
        field: "user_id",
        allowNull: false,
        type: Sequelize.DataTypes.UUID,
        references: {
          model: USER_TABLE,
          key: "id",
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(INTERACTION_TABLE);
    await queryInterface.dropTable(POST_TABLE);
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(ACCOUNT_TABLE);
  },
};
