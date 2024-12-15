const express = require("express");
const {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    upload
} = require("./controllers/productControllers");



require("express-async-errors");
const multer = require('multer');
const path = require("path");
const { sendOTP } = require("./controllers/ordersControllers");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, '../../uploads');
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});


const uploadMultiple = multer({
    storage: storage,
    limits: {
        fileSize: 40 * 1024 * 1024, 
        fieldSize: 40 * 1024 * 1024, 
    },
}).array('image',5);


// AddProductRouter.post("/addProductToStore", uploadMultiple,authenticateToken,createProduct);



const Router = express.Router();
Router.get('/getproducts', getProducts);
Router.get('/getproduct/:id', getProductById);
Router.post('/addproduct', uploadMultiple, addProduct);
Router.put('/updateproduct/:id', updateProduct);
Router.delete('/deleteproduct/:id', deleteProduct);
Router.post("/sendotp/:phoneNumber",sendOTP)



module.exports = Router;
