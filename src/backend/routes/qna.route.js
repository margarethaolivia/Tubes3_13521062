let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// qna Model
let qnaSchema = require("../models/qna.model");

// CREATE qna
router.route("/").post(async (req, res, next) => {
  try {
    console.log(req.body);
    const data = await qnaSchema.create(req.body);
    console.log(data);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// READ qna
router.route("/").get(async (req, res, next) => {
  try {
    const data = await qnaSchema.find();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// Get Single qna
router.route("/single").get(async (req, res, next) => {
  try {
    const question = req.body.question;
    const data = await qnaSchema.findOne({ question });
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// DELETE qna
router.route("/delete/").delete(async (req, res, next) => {
  try {
    const question = req.body.question;
    const data = await qnaSchema.findOneAndDelete({ question });
    res.status(200).json({
      msg: data,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
