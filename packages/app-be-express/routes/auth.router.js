const express = require("express");
const validatorHandler = require("../middlewares/validator.handler");
const { loginSchema } = require("../schemas/auth.schema");
const AuthService = require("../services/auth.service");

const router = express.Router();
const service = new AuthService();

router.post("/login", validatorHandler(loginSchema, "body"), async (req, res, next) => {
  try {
    const data = req.body;
    const token = await service.login(data);
    res.json(token);
  } catch (error) {
    next(error);
  }
});

module.exports = router