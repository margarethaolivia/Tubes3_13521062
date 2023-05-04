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

// DELETE chat history (1 tab)
router.route("/delete/:chat_id").delete(async (req, res, next) => {
  try {
    const chat_id = req.params.chat_id;
    const data = await historySchema.deleteMany({ chat_id });
    res.status(200).json({
      msg: `${data.deletedCount} chat history records deleted.`,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
