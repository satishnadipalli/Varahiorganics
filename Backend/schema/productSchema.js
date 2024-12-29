const mongoose = require("mongoose");
const reviewSchema = require("./ReviewSchema"); // Import the schema, not the model

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    badge: { type: String, required: false },
    oldPrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
    category: String,
    feedbacks: [{
      user: String,
      feed: String,
      date:String,
      rateGiven:Number
  }], 
  avgRating: {
    type:Number,
    required:[false,"please provide the avgRating of the product"],
    default:0
  },
    image: [{ type: String, required: true }], // Array of image URLs
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductsDB", productSchema);
