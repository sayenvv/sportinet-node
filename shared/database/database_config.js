const mongoose = require('mongoose');
require('dotenv').config();
const MODULE_PORT_MAPPER = require("./module_port_mapper")

const USER_SERVICE_PORT = process.env.USER_SERVICE_EXPOSED_PORT || 3000; // Fallback to default port if not set
const MONGO_URI = process.env.MONGO_URI;

const databaseConnection = (app,module) => {
  const SERVICE_PORT = MODULE_PORT_MAPPER[module]
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(SERVICE_PORT, () => {
      console.log(`${module} listening on port ${SERVICE_PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
};

module.exports = databaseConnection;
