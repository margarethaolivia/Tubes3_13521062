let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// Student Model
let studentSchema = require("../models/student.model");

// CREATE Student
router.route("/").post(async (req, res, next) => {
  try {
    console.log(req.body);
    const data = await studentSchema.create(req.body);
    console.log(data);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// READ Students
router.route("/").get(async (req, res, next) => {
  try {
    const data = await studentSchema.find();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// Get Single Student
router.route("/:id").get(async (req, res, next) => {
  try {
    const data = await studentSchema.findById(req.params.id);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// Update Student
router.route("/update-student/:id").put(async (req, res, next) => {
  try {
    const data = await studentSchema.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(data);
    console.log("Student updated successfully !");
  } catch (error) {
    next(error);
    console.log(error);
  }
});

// Delete Student
router.route("/delete-student/:id").delete(async (req, res, next) => {
  try {
    const data = await studentSchema.findByIdAndRemove(req.params.id);
    res.status(200).json({
      msg: data,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
