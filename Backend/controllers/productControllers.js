const ProductsDB = require("../schema/productSchema");
const mongoose = require("mongoose");
const multer = require("multer");

// Set up multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/"); // Directory where images will be stored
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique filenames
    }
});

const upload = multer({ 
    storage, 
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/; // Allowed file types
        const extname = fileTypes.test(file.mimetype.toLowerCase());
        if (extname) {
            return cb(null, true);
        } else {
            cb(new Error("Only images are allowed!"));
        }
    } 
});

// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await ProductsDB.find({});
        return res.status(200).json({ products });
    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({ error: "An error occurred while fetching products." });
    }
};

// Get a product by ID
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid product ID." });
        }

        const product = await ProductsDB.findById(id);

        if (!product) {
            return res.status(404).json({ error: "Product not found." });
        }

        return res.status(200).json({ product });
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        return res.status(500).json({ error: "An error occurred while fetching the product." });
    }
};

// Add a new product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, quantity, category } = req.body;

        // Collect image file paths
        const images = req.files.map(file => file.path);

        const newProduct = new ProductsDB({
            name,
            description,
            price,
            quantity,
            category,
            images
        });

        await newProduct.save();

        return res.status(201).json({ product: newProduct });
    } catch (error) {
        console.error("Error adding product:", error);
        return res.status(500).json({ error: "An error occurred while adding the product." });
    }
};

// Update a product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid product ID." });
        }

        const { name, description, price, quantity, category } = req.body;

        const updatedProduct = await ProductsDB.findByIdAndUpdate(
            id,
            { name, description, price, quantity, category },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found." });
        }

        return res.status(200).json({ product: updatedProduct });
    } catch (error) {
        console.error("Error updating product:", error);
        return res.status(500).json({ error: "An error occurred while updating the product." });
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid product ID." });
        }

        const deletedProduct = await ProductsDB.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found." });
        }

        return res.status(200).json({ message: "Product deleted successfully." });
    } catch (error) {
        console.error("Error deleting product:", error);
        return res.status(500).json({ error: "An error occurred while deleting the product." });
    }
};

// Export functions and multer upload
module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    upload
};
