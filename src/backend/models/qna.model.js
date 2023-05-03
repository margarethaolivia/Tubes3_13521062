const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let qnaSchema = new Schema(
  {
    question: {
      type: String,
      unique : true,
      required : true,
    },
    answer: {
      type: String,
      required : true,
    },
  },
  {
    collection: "qna",
  }
);
module.exports = mongoose.model("qna", qnaSchema);
