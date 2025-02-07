require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const transactionRouter = require("./routes/products.routes"); 

const app = express();

app.use(express.json());

// Enable CORS
app.use(cors());
app.options("*", cors());

// Connect to Database
connectDB();

// Routes
app.use("/", transactionRouter); // Fixed typo

module.exports = app;
