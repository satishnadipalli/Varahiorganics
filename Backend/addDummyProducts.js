

// Dummy Products

// Insert Dummy Products
// const addProducts = async () => {
    //     try {
        //         await ProductsDB.insertMany(dummyProducts);
        //         console.log("Dummy products added successfully.");
        //         mongoose.disconnect(); // Close the connection
        //     } catch (error) {
            //         console.error("Error adding dummy products:", error);
            //     }
            // };
            
            // addProducts();



const express = require("express");
require("express-async-errors");
require('dotenv').config();
const ProductsDB = require("./schema/productSchema")
// const products = require("../../Frontend/public/data/products.json")
const mongoose = require('mongoose');



const dummyProducts = [
    {
        name: "Smartphone XYZ",
        description: "A high-quality smartphone with 128GB storage and a stunning display.",
        price: 699,
        quantity: 50,
        category: "Electronics",
        images: ["https://vamshifarms.com/cdn/shop/files/coconut_oil_image_2.jpg?v=1723485819&width=848", "https://vamshifarms.com/cdn/shop/files/Saffaloweroil.jpg?v=1723289197&width=400"],
    },
    {
        name: "Running Shoes Pro",
        description: "Comfortable and lightweight running shoes for daily use.",
        price: 120,
        quantity: 100,
        category: "Sportswear",
        images: ["https://vamshifarms.com/cdn/shop/files/ecommified_httpss.mj.run1YPvs8udvp4_toor_dal_yellow_pusles_in_a_81c0e10d-f0ed-4888-b86a-2168b1a0c6ad.png?v=1720156594&width=848", "https://vamshifarms.com/cdn/shop/files/ecommified_brown_wooden_table_ecbdd5f2-1894-432f-99b8-350f725f61de.png?v=1720157396&width=88"],
    },
];

const start = async () => {
  console.log(process.env.CONNECTION_STRING)
  try {
   
    await mongoose.connect("mongodb+srv://satishnadipalli:satishnadipalli@tasksdb.sbxibfx.mongodb.net/?retryWrites=true&w=majority");
    await ProductsDB.deleteMany();
    await ProductsDB.create(dummyProducts)
    console.log("Data initialized successfully");
  } catch (error) {
    console.error("Error during initialization:", error.message);
  }
};

start();