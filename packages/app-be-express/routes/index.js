const express = require("express");

const usersRouter = require("./users.router");
const postsRouter = require("./posts.router");

const routerApi = (app) => {
  const router = express.Router();
  app.use("/api/v1", router);

  router.use("/users", usersRouter);
  router.use("/posts", postsRouter);
};

module.exports = routerApi;
