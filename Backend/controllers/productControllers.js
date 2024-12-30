const ProductsDB = require("../schema/productSchema");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path")
const REVIEW = require("../schema/ReviewSchema")

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
        console.log("Incoming Request Data:", req.body);
        console.log("Uploaded Files:", req.files);

        const { name, description, price, quantity, category,oldPrice } = req.body;

        // Transform absolute file paths to relative paths
        const images = req.files.map(file => {
            const relativePath = file.path.split('uploads').pop(); // Extract everything after 'uploads'
            return `uploads${relativePath.replace(/\\/g, '/')}`; // Ensure proper formatting
        });
        

        const newProduct = new ProductsDB({
            name,
            description,
            price,
            quantity,
            oldPrice,
            category,
            image: images, // Use normalized relative paths here
        });

        await newProduct.save();
        console.log("Saved Product:", newProduct);
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
        console.log(id)
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid product ID." });
        }

        

        const { name, description, price, quantity, category,badge } = req.body;

        console.log(name, description, price, quantity, category,req.body.name)
        const updatedProduct = await ProductsDB.findByIdAndUpdate(
            id,
            { name, description, price, quantity, category,badge },
            { new: true }
        );

        console.log(updatedProduct)
        if (!updatedProduct) {
            console.log("Not found")
            return res.status(404).json({ error: "Product not found." });
        }
        console.log("updated")

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


const randomProducts = async(req,res)=>{
    try {
        const products  = await ProductsDB.find({});
        console.log(products)
        if(products.length > 0){
            console.log(products)
            return res.status(200).json({products});
        }else{
            return res.status(200).json({products,error:"Products not found"});
        }
    } catch (error) {
        
    }
}

const getSortProduct = async (req, res) => {
    try {
        const { sort, minPrice, maxPrice, searchQuery } = req.query;

        const min = parseFloat(minPrice) || 0; // Default to 0
        const max = parseFloat(maxPrice) || Infinity; // Default to Infinity
        let sortOrder;

        if (sort === "asc") {
            sortOrder = { price: 1 };
        } else if (sort === "desc") {
            sortOrder = { price: -1 };
        } else if (sort) {
            return res.status(400).json({ error: "Invalid sort parameter. Use 'asc' or 'desc'." });
        }

        // Build search filter
        let searchFilter = {};
        if (searchQuery) {
            const searchRegex = new RegExp(searchQuery, "i"); // Case-insensitive search
            searchFilter = { 
                $or: [
                    { name: searchRegex },
                    { description: searchRegex }
                ]
            };
        }

        // Build price range filter
        const priceFilter = {
            price: { $gte: min, $lte: max },
        };

        // Fetch products matching search query and price range
        const matchingProducts = await ProductsDB.find({ 
            ...searchFilter,
            ...priceFilter
        }).sort(sortOrder);

        // Fetch non-matching products within price range
        const nonMatchingProducts = await ProductsDB.find({
            ...priceFilter,
            $nor: [
                { name: new RegExp(searchQuery, "i") },
                { description: new RegExp(searchQuery, "i") }
            ],
        }).sort(sortOrder);

        // Merge matching and non-matching products
        const products = [...matchingProducts, ...nonMatchingProducts];

        if (!products.length) {
            return res.status(404).json({ error: "No products found matching your criteria." });
        }

        return res.status(200).json({ products });
    } catch (error) {
        console.error("Error filtering, searching, and sorting products:", error);
        return res.status(500).json({ error: "An error occurred while processing your request." });
    }
};


// const addReview = async(req,res) =>{
//     const {user, rateGiven, feed} = req.body;
    
//     if(!user || !rateGiven || !feed){
//         res.status(400).json({msg:"please fill all the details given"});
//     }

//     try {
//         const newReview = await REVIEW.create({user,rateGiven,feed});

//         if(!newReview){
//             res.status(400).json({msg:"Something went wrong"});
//         }

//         const reviews = await REVIEW.find({});

//         return res.status(201).json({newReview,reviews})
//     } catch (error) {
        
//     }
// }




const addreview = async (req, res) => {
    try {
        const { productId } = req.params;
        const { user, feed, rateGiven } = req.body;
        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;

        const updatedFeed = { user, feed, date: formattedDate, rateGiven };

        console.log(updatedFeed,productId)

        // Find the product by ID
        const product = await ProductsDB.findById(productId);
        
        if (!product) {
            console.log("error")
            return res.status(404).json({ message: "Product not found" });
        }

        // Ensure the `feedbacks` array exists
        if (!product.feedbacks) {
            product.feedbacks = [];
        }

        // Add the new review to feedbacks
        product.feedbacks.push(updatedFeed);

        // Calculate average rating
        const totalRating = product.feedbacks.reduce((total, review) => total + review.rateGiven, 0);
        const avgRating = product.feedbacks.length > 0 ? totalRating / product.feedbacks.length : 0;

        // Update the product with new feedbacks and average rating
        product.avgRating = avgRating;
        await product.save();

        console.log(product);
        return res.status(201).json({ product });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred", error });
    }
};



const adminlogin = async(req, res) => {
  const { username, password } = req.body;

  // Example logic for validating credentials (use your own database validation)
  if (username === "varahigrainsxxy" && password === "vgrainspwd") {
    return res.status(200).json({ message: "Login successful" });
  }

  return res.status(401).json({ message: "Invalid credentials" });
};










// Export functions and multer upload
module.exports = {
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
};
