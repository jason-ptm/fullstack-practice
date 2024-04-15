const express = require("express");

const validatorHandler = require("../middlewares/validator.handler");
const { getUserSchema, createUserSchema, updateUserSchema } = require("../schemas/user.schema");
const UserService = require("../services/user.service");

const router = express.Router();
const service = new UserService();

router.get("/:id", validatorHandler(getUserSchema, "params"), async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await service.getOne(id);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.post("/", validatorHandler(createUserSchema, "body"), async (req, res, next) => {
  try {
    const body = req.body;
    const data = await service.create(body);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", validatorHandler(getUserSchema, "params"), validatorHandler(updateUserSchema, "body"), async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const data = await service.update(id, body);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
