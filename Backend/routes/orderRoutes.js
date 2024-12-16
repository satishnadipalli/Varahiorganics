const express = require("express");
const {
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    markOrderAsDelivered,
    deleteOrder,
    createOrder
} = require("../controllers/ordersControllers");

const OrderRouter = express.Router();

// Fetch all orders
OrderRouter.get("/getorders", getAllOrders);

OrderRouter.post("/createOrder",createOrder);

// Fetch a specific order by ID
OrderRouter.get("/getorder/:id", getOrderById);

// Update order status
OrderRouter.put("/updateorderstatus/:id/", updateOrderStatus);

// Mark order as delivered
OrderRouter.put("/:id/deliver", markOrderAsDelivered);

// Delete an order
OrderRouter.delete("/:id", deleteOrder);

module.exports = OrderRouter;
