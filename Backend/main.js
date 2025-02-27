const express = require("express");
const path = require("path");
const Router = require("./routes.js");
const cors = require("cors");
const asyncErrors = require("express-async-errors");
const CONNECT_DB = require("./ConnectDB");
const bodyParser = require("body-parser");
const OrderRouter = require("./routes/orderRoutes.js");


const app = express();
app.use(cors());
app.use(bodyParser.json())
app.use('/uploads', express.static(path.join(__dirname, './uploads')));
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json({ limit: '500mb' })); 

app.use(Router)
app.use(OrderRouter);

app.get("/", (req, res) => {
    res.send("hello");
});
  

  const start = async () => {
    try {
      await CONNECT_DB();
      const PORT = process.env.PORT || 3000; 
      app.listen(PORT, () => {
        console.log(`The server is listening on port ${PORT}`);
      });
    } catch (error) {
      console.error("An error occurred while starting the server:", error);
      process.exit(1); 
    }
  };
  
  
  start();

  // commits are rencent and making them to feel fresh over the times with an anual inactivity over the marking points