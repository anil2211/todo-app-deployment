const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");

const connectDB = require("./db");
const todoRoutes = require("./routes/todoRoutes");

dotenv.config();

const app = express();

connectDB();

// Request logging middleware — add here
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
});

// CORS config
app.use(cors({
  origin: 'https://anil2211.github.io',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middlewares
app.use(bodyParser.json());
app.use(express.json());

// API routes first
app.use('/api', todoRoutes);

// Serve frontend (after API routes!)
app.use(express.static(path.join(__dirname, "../todo-frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../todo-frontend/build", "index.html"));
});

module.exports = app;
