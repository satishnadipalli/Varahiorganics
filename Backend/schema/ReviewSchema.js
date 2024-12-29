const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    user: { type: String, required: true }, // User's name or ID
    rateGiven: { type: Number, required: true, min: 1, max: 5 }, // Assuming a 1–5 rating scale
    feed: { type: String, required: true }, // Feedback message
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

module.exports = mongoose.model("Review", reviewSchema);
