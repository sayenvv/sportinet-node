const mongoose = require('mongoose');
require('dotenv').config();

const USER_SERVICE_PORT = process.env.USER_SERVICE_EXPOSED_PORT || 3000; // Fallback to default port if not set
const MONGO_URI = process.env.MONGO_URI;

const databaseConnection = (app) => {
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(USER_SERVICE_PORT, () => {
      console.log(`User service listening on port ${USER_SERVICE_PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
};

module.exports = databaseConnection;
