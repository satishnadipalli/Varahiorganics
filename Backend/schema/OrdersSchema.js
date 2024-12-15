const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
    {
        customer: {
            name: { type: String, required: true },
            email: { type: String, required: true },
            phone: { type: String },
            address: {
                street: { type: String, required: true },
                city: { type: String, required: true },
                state: { type: String, required: true },
                zipCode: { type: String, required: true },
                country: { type: String, required: true }
            }
        },
        products: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: "ProductsDB", required: true },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true } // Price at the time of the order
            }
        ],
        totalAmount: { type: Number, required: true }, // Total order amount
        paymentStatus: {
            type: String,
            default: "Pending"
        },
        orderStatus: {
            type: String,
            enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
            default: "Pending"
        },
        paymentMethod: {
            type: String,
            enum: ["Credit Card", "Debit Card", "PayPal", "Cash on Delivery"],
            required: false
        },
        orderDate: { type: Date, default: Date.now },
        deliveryDate: { type: Date }
    },
    { timestamps: true }
);

module.exports = mongoose.model("OrdersDB", orderSchema);
