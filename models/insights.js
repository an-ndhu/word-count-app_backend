const mongoose = require("mongoose");

const insightSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    wordsLength: {
      type: Number,
    },
    keywordArray: {
      type: [],
    },
    favourite: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Insights", insightSchema);
