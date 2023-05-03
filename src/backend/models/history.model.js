const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let historySchema = new Schema(
  {
    chat_id: {
      type: Number,
      required : true
    },
    question: {
      type: String,
    },
    answer: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "history",
  }
);
module.exports = mongoose.model("history", historySchema);
