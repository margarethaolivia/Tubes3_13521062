const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let tabSchema = new Schema(
  {
    tab_id: {
      type: Number,
      default: 1,
      unique: true,
      index: true,
    },
  },
  {
    collection: "tab",
  }
);
module.exports = mongoose.model("tab", tabSchema);
