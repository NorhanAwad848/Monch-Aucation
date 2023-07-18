// imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

// Import API ENDPOINTS ROUTES
const Aucationrouter = require('./routes/Auction');
const productRoutes = require('./routes/Product');
const userrouter = require('./routes/user');
const Categoryrouter = require('./Routes/Category');
const Rolerouter = require('./Routes/Role');
const AuthRouter = require('./Routes/Auth');


const verifyToken= require('./middlewares/token-verify');
const rolecheck=require ('./middlewares/rolecheck');

// Create App
const app = express();
const port = process.env.PORT || 4000;
const host = process.env.HOST || "localhost";

app.use(cors());

// Parse request body data
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static("uploads"));

// Connect to db
const db = require('./config/database');

// Middlewares (Send request to specific endpoints)
app.use("/api/Product", productRoutes);
app.use("/api/User", userrouter);
app.use("/api/Aucation", Aucationrouter);
app.use("/api/Category",verifyToken,rolecheck("Admin"), Categoryrouter);
app.use("/api/Role",verifyToken,rolecheck("Admin"), Rolerouter);
app.use("/api/Auth", AuthRouter);
// app.use("/api/users", userRoutes);

// Listen to requests
app.listen(port, host, (res)=> {
    console.log("Server is running");
})