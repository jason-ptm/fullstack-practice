const express = require("express");
const passport = require("passport");
const { validatorHandler, checkOwnerHandler } = require("../middlewares/validator.handler");
const { loginSchema, updateAccountSchema } = require("../schemas/auth.schema");
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

router.patch("/", passport.authenticate("jwt", { session: false }), checkOwnerHandler("body"), validatorHandler(updateAccountSchema, "body"), async (req, res, next) => {
  try {
    const body = req.body;
    const newUser = await service.update(body);
    res.json(newUser);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
