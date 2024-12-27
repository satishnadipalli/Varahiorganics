const OrdersDB = require("../schema/OrdersSchema");
const mongoose = require("mongoose");
const twilio = require('twilio');
require('dotenv').config();
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = new twilio(accountSid, authToken);

// Fetch all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await OrdersDB.find().populate("products.productId"); // Populate product details if needed
        return res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        return res.status(500).json({ error: "An error occurred while fetching orders." });
    }
}

const createOrder = async (req, res) => {
    try {
        const {
            customer,
            products,
            totalAmount,
            paymentMethod,
            termsAccepted,
            orderNotes,
            weight
        } = req.body;

        const weights = products.map((ele)=>ele.weight)

        console.log("Hello here are the weights of indivudual products",weights)

        // Validate required fields
        if (!termsAccepted) {
            return res
                .status(400)
                .json({ error: "You must accept the terms and conditions to place an order." });
        }

        if (!customer || !customer.firstName || !customer.email || !customer.phone) {
            return res.status(400).json({ error: "Customer information is incomplete." });
        }

        if (!products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ error: "No products provided in the order." });
        }

        if (!totalAmount || totalAmount <= 0) {
            return res.status(400).json({ error: "Invalid total amount." });
        }

        // Create and save the order
        const newOrder = new OrdersDB({
            customer,
            products,
            
            totalAmount,
            // paymentMethod,
            termsAccepted,
            orderNotes,
        });
        await newOrder.save();
        return res
            .status(201)
            .json({ message: "Order created successfully.", order: newOrder });
    } catch (error) {
        console.error("Error creating order:", error);
        return res.status(500).json({ error: "An error occurred while creating the order." });
    }
};


// Fetch a specific order by ID
const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid order ID." });
        }

        console.log("Hi")
        const order = await OrdersDB.findById(id).populate("products.productId");

        if (!order) {
            return res.status(404).json({ error: "Order not found." });
        }

        return res.status(200).json({ order });
    } catch (error) {
        console.error("Error fetching order by ID:", error);
        return res.status(500).json({ error: "An error occurred while fetching the order." });
    }
};

// Update order status
const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        console.log(id,status)


        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid order ID." });
        }

        const validStatuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: `Invalid status. Valid statuses are: ${validStatuses.join(", ")}` });
        }

        const updatedOrder = await OrdersDB.findByIdAndUpdate(
            id,
            { orderStatus: status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ error: "Order not found." });
        }
        return res.status(200).json({ message: "Order status updated successfully.", order: updatedOrder });
    } catch (error) {
        console.error("Error updating order status:", error);
        return res.status(500).json({ error: "An error occurred while updating the order status." });
    }
};

// Mark order as delivered
const markOrderAsDelivered = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid order ID." });
        }

        const updatedOrder = await OrdersDB.findByIdAndUpdate(
            id,
            { orderStatus: "Delivered", deliveryDate: new Date() },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ error: "Order not found." });
        }

        return res.status(200).json({ message: "Order marked as delivered.", order: updatedOrder });
    } catch (error) {
        console.error("Error marking order as delivered:", error);
        return res.status(500).json({ error: "An error occurred while marking the order as delivered." });
    }
};

// Delete an order
const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid order ID." });
        }

        const deletedOrder = await OrdersDB.findByIdAndDelete(id);

        if (!deletedOrder) {
            return res.status(404).json({ error: "Order not found." });
        }

        const orders = await OrdersDB.find({});

        return res.status(200).json({ message: "Order deleted successfully.",orders });
    } catch (error) {
        console.error("Error deleting order:", error);
        return res.status(500).json({ error: "An error occurred while deleting the order." });
    }
};


// Endpoint to send OTP
const sendOTP = async(req,res) =>{
//   const {phoneNumber}  = req.params;
//     console.log(phoneNumber,"here is t otp")
//   // Validate phone number
//   if (!phoneNumber || phoneNumber.length !== 10) {
//     return res.status(400).send({ error: 'Invalid phone number' });
//   }

//   // Generate a random 4-digit OTP
//   const otp = Math.floor(1000 + Math.random() * 9000).toString();

//   // Send OTP using Twilio
//   client.messages
//     .create({
//       body: `Your OTP code is: ${otp}`,
//       from: process.env.TWILIO_PHONE_NUMBER,  // Your Twilio phone number
//       to: `+91${phoneNumber}`  // Assuming you're sending to an Indian number
//     })
//     .then((message) => {
//       console.log('OTP sent:', message.sid);
//       return res.status(200).send({ message: 'OTP sent successfully' });
//     })
//     .catch((error) => {
//       console.error('Error sending OTP:', error);
//       return res.status(500).send({ error: 'Failed to send OTP' });
//     });
}

module.exports = {
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    markOrderAsDelivered,
    deleteOrder,
    sendOTP,
    createOrder
};
