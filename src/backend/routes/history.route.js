let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// History Model
let historySchema = require("../models/history.model");

// CREATE Chat
router.route("/:chat_id").post(async (req, res, next) => {
  try {
    console.log(req.body);
    const chat_id = req.params.chat_id;
    const data = await historySchema.create({ ...req.body, chat_id });
    console.log(data);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// READ Chats
router.route("/").get(async (req, res, next) => {
  try {
    const data = await historySchema.find();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// Get Single Chat Tab
router.route("/:chat_id").get(async (req, res, next) => {
  try {
    const chat_id = req.params.chat_id;
    const data = await historySchema.find({ chat_id });
    res.json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
