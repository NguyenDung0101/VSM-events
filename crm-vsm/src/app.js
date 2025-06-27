const express = require('express');
const mongoose = require('mongoose');
const articleRoutes = require('./routes/articleRoutes');
const dbConfig = require('../config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
dbConfig();

// Routes
app.use('/api/articles', articleRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});