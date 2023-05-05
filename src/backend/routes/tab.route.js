let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// tab Model
let tabSchema = require("../models/tab.model");

// CREATE tab
router.route("/").post(async (req, res, next) => {
  try {
    // Find the current highest tab_id in the database
    const maxTab = await tabSchema.findOne().sort({ tab_id: -1 }).limit(1);
    const highestTabId = maxTab ? maxTab.tab_id : 0;

    // Increment the highest tab_id and use it as the new tab_id for the document
    const newTabId = highestTabId + 1;
    req.body.tab_id = newTabId;

    // Create the document with the new tab_id
    const data = await tabSchema.create(req.body);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// READ tab
router.route("/").get(async (req, res, next) => {
  try {
    const data = await tabSchema.find();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// DELETE tab
router.route("/delete/:id").delete(async (req, res, next) => {
  try {
    const data = await tabSchema.deleteOne({ tab_id: req.params.id });
    res.status(200).json({
      msg: data,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
