const express = require("express");

const { validatorHandler, checkOwnerHandler } = require("../middlewares/validator.handler");
const { getPostSchema, createPostSchema, updatePostSchema, deletePostSchema, likePostSchema } = require("../schemas/post.schema");
const PostService = require("../services/post.service");
const Interaction = require("../services/interaction.service");
const passport = require("passport");

const router = express.Router();
const service = new PostService();
const interactionService = new Interaction();

router.get("/", passport.authenticate("jwt", { session: false }), async (req, res, next) => {
  try {
    const { page, pageSize } = req.query;
    const data = await service.getAll(page, pageSize);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

router.post("/", passport.authenticate("jwt", { session: false }), validatorHandler(createPostSchema, "body"), async (req, res, next) => {
  try {
    const body = req.body;
    const data = await service.create(body);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", passport.authenticate("jwt", { session: false }), checkOwnerHandler("body"), validatorHandler(getPostSchema, "params"), validatorHandler(updatePostSchema, "body"), async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const data = await service.update(id, body);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", passport.authenticate("jwt", { session: false }), checkOwnerHandler("body"), validatorHandler(getPostSchema, "params"), validatorHandler(deletePostSchema, "body"), async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await service.delete(id);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.post("/like", passport.authenticate("jwt", { session: false }), validatorHandler(likePostSchema, "body"), async (req, res, next) => {
  try {
    const data = req.body;
    const ok = await interactionService.toggleLike(data);

    res.json(ok);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
