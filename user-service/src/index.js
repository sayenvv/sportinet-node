require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(bodyParser.json()); // Use bodyParser before defining routes
app.use(express.json());

app.use('/users', userRoutes);
app.use(errorHandler);

const USER_SERVICE_PORT = process.env.USER_SERVICE_EXPOSED_PORT || 3000; // Fallback to default port if not set
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  app.listen(USER_SERVICE_PORT, () => {
    console.log(`User service listening on port ${USER_SERVICE_PORT}`);
  });
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
