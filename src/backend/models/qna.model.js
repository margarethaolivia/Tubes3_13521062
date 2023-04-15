const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let qnaSchema = new Schema(
  {
    question: {
      type: String,
    },
    answer: {
      type: String,
    },
  },
  {
    collection: "qna",
  }
);
module.exports = mongoose.model("qna", qnaSchema);
