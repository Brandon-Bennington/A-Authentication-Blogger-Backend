const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const blogRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/users');
app.use('/blogs', blogRoutes);
app.use('/users', userRoutes);

// MongoDB Connection
mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: process.env.ATLAS_BLOG_DATABASE
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));




/*
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Import your routes
const blogRoutes = require('./routes/blogRoutes');
app.use('/api/blogs', blogRoutes);

// MongoDB connection
const uri = process.env.ATLAS_URI;
const db = process.env.MONGO_DATABASE;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: db // Use the MONGO_DATABASE environment variable as the database name
});
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB cluster');
});

// Error handling
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
*/