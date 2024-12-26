
const mongoose = require("mongoose")


const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    badge:{type:String,required:false},
    oldPrice : {type : Number, required :true},
    quantity: { type: Number, required: true },
    category: String,
    image: [{ type: String, required: true }], // Array of image URLs
  }, { timestamps: true });
  
  module.exports = mongoose.model("ProductsDB",productSchema);
  
  