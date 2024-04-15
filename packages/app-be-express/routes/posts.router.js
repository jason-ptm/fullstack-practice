const express = require("express");

const validatorHandler = require("../middlewares/validator.handler");
const { getPostSchema, createPostSchema, updatePostSchema, deletePostSchema, likePostSchema } = require("../schemas/post.schema");
const PostService = require("../services/post.service");
const Interaction = require("../services/interaction.service");

const router = express.Router();
const service = new PostService();
const interactionService = new Interaction();

router.get("/", async (req, res, next) => {
  try {
    const data = await service.getAll();
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

router.post("/", validatorHandler(createPostSchema, "body"), async (req, res, next) => {
  try {
    const body = req.body;
    const data = await service.create(body);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", validatorHandler(getPostSchema, "params"), validatorHandler(updatePostSchema, "body"), async (req, res, next) => {
  try {
    console.log("🚀 ~ router.patch ~ body:");
    const { id } = req.params;
    const body = req.body;

    const data = await service.update(id, body);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", validatorHandler(getPostSchema, "params"), validatorHandler(deletePostSchema, "body"), async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await service.delete(id);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.post("/like", validatorHandler(likePostSchema, "body"), async (req, res, next) => {
  try {
    const data = req.body;
    const ok = await interactionService.toggleLike(data);

    res.json(ok);
  } catch (error) {
    next(error);
  }
});

module.exports = router;