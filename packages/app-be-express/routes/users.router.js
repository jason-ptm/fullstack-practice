const express = require("express");

const router = express.Router();

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    res.json(id);
  } catch (error) {
    next(error);
  }
});

router.post("/", (req, res, next) => {
  try {
    const body = req.body;

    res.json(body);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;

    res.json({ body, id });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
