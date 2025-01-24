const express = require("express");
const {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    upload,
    randomProducts,
    getSortProduct,
    addreview,
    adminlogin
} = require("./controllers/productControllers");



require("express-async-errors");
const multer = require('multer');
const path = require("path");
const { sendOTP } = require("./controllers/ordersControllers");

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         const uploadPath = path.join(__dirname, 'uploads');
//         //uploading the paths into the source folders
//         cb(null, uploadPath);
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now();
//         cb(null, uniqueSuffix + '-' + file.originalname);
//     }
// });


// const uploadMultiple = multer({
//     storage: storage,
//     limits: {
//         fileSize: 40 * 1024 * 1024, 
//         fieldSize: 40 * 1024 * 1024, 
//     },
// }).array('image',5);


// AddProductRouter.post("/addProductToStore", uploadMultiple,authenticateToken,createProduct);



const Router = express.Router();
Router.post('/addproduct', upload.array('image', 5), addProduct); 
Router.get('/getproducts', getProducts);
Router.get('/getproduct/:id', getProductById);
Router.put('/updateproduct/:id', updateProduct);
Router.delete('/deleteproduct/:id', deleteProduct);
Router.post("/sendotp/:phoneNumber",sendOTP)
Router.get("/getRandomProducts",randomProducts);
Router.get("/products/sort",getSortProduct);
Router.put("/addreview/:productId",addreview);
Router.post("/admin/login",adminlogin)

module.exports = Router;
