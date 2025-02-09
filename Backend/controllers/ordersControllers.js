const OrdersDB = require("../schema/OrdersSchema");
const mongoose = require("mongoose");
const twilio = require('twilio');
require('dotenv').config();
const ProductsDB = require("../schema/productSchema");
const nodemailer = require("nodemailer");
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = new twilio(accountSid, authToken);



const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "varahiorganics.foods@gmail.com",
      pass: "mffh dcof ekqz dhfn",
    },
  });
  

  //sending a mail to the user when he order some products through the website 
  const sendOrderEmail = (email, products) => {
    const subtotal = products.reduce((total, product) => total + product.price, 0);
  
    const productList = products
      .map(
        (product) => `
          <div class="product-item">
            <img src="${product?.image}" alt="${product.title}" class="product-image" />
            <div class="product-details">
              <h3>${product.title} ${product?.weight}</h3>
              <p>Price: Rs. ${product.price.toFixed(2)}</p>
            </div>
          </div>
        `
      )
      .join("");
  
    const mailOptions = {
      from: "varahiorganics.foods@gmail.com",
      to: email,
      subject: "Your Order Confirmation - Varahi Grains",
      html: `
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #fff;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .logo {
              text-align: center;
              margin-bottom: 20px;
            }
            .product-item {
              display: flex;
              align-items: center;
              border-bottom: 1px solid #ddd;
              padding: 10px 0;
            }
            .product-image {
              width: 80px;
              height: 80px;
              object-fit: cover;
              border-radius: 8px;
              margin-right: 15px;
            }
            .product-details h3 {
              margin: 0;
              color: #333;
            }
            .product-details p {
              margin: 5px 0;
              color: #666;
            }
            .summary {
              text-align: right;
              margin-top: 20px;
              font-size: 18px;
              font-weight: bold;
            }
            .delivery-message {
              background-color: #e0f7fa;
              padding: 10px;
              border-radius: 5px;
              margin-top: 20px;
              text-align: center;
              color: #00796b;
              font-weight: bold;
            }
            .logoimg{
              width: 80px;
              height: 80px;
              object-fit: cover;
                object-fit: cover;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">
              <img class="logoimg" src="https://res.cloudinary.com/dlehbizfp/image/upload/v1739121719/logo_n8biro.png" />
            </div>
            <h1>Thank You for Your Order!</h1>
            <p>We've received your order and are processing it. Here are the details:</p>
  
            ${productList}
  
            <div class="summary">Subtotal + delivery: Rs. ${(subtotal+60).toFixed(2)}</div>
  
            <div class="delivery-message">
              You will receive your products within the next 3 days!
              <br/>
              Thanks for ordering.
            </div>
          </div>
        </body>
        </html>
      `,
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  };

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


// The Api to get the product images from the database

const processOrderInBackground = async (email, products) => {
    try {
      const productIds = products.map((p) => p.productId);
      const productDetails = await ProductsDB.find({ _id: { $in: productIds } });
  
      const enrichedProducts = products.map((product) => {
        const details = productDetails.find((p) => p._id.toString() === product.productId);

        // console.log(enrichedProducts);
        //return statement to end the process;
        return {
          ...product,
          title: details?.name || "Unknown Product",
          image: details?.image?.[0] || "https://via.placeholder.com/80",
        };
      });
  
      await sendOrderEmail(email, enrichedProducts);
      console.log("Order confirmation email sent successfully.");
    } catch (error) {
      console.error("Error processing order in background:", error);
    }
  };
  

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

        // console.log(products)
        // return
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

        processOrderInBackground(customer.email, products);
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
